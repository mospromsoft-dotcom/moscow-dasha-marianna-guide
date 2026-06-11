"use client";

/* eslint-disable @next/next/no-img-element */

import {
  AlertTriangle,
  Backpack,
  BookOpen,
  CalendarDays,
  Camera,
  CheckCircle2,
  Circle,
  Clock,
  CloudRain,
  CloudSun,
  Coins,
  ExternalLink,
  Home,
  ListChecks,
  Map,
  MapPin,
  Navigation,
  RefreshCcw,
  ShieldCheck,
  Sun,
  Ticket,
  Users,
  Wallet,
} from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  adultWarnings,
  quickAlternatives,
  safetyRules,
  tripDays,
  weatherRows,
  type BudgetPlan,
  type CommutePlan,
  type PriceLevel,
  type PriceItem,
  type TripDay,
  type TripStep,
} from "@/data/trip";

const progressStorageKey = "dasha-marianna-trip-progress-v1";
const activeDayStorageKey = "dasha-marianna-active-day-v1";

const priceFilters: { id: PriceLevel | "all"; label: string }[] = [
  { id: "all", label: "все" },
  { id: "free", label: "0 ₽" },
  { id: "low", label: "до 1 000" },
  { id: "mid", label: "средне" },
  { id: "high", label: "дорого" },
];

const spendSizeTags: { id: PriceLevel; label: string }[] = [
  { id: "free", label: "0 ₽" },
  { id: "low", label: "до 1 000 ₽" },
  { id: "mid", label: "средние траты" },
  { id: "high", label: "дорого" },
];

const priceStyles: Record<PriceLevel, string> = {
  free: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  low: "bg-cyan-50 text-cyan-800 ring-cyan-200",
  mid: "bg-amber-50 text-amber-900 ring-amber-200",
  high: "bg-rose-50 text-rose-800 ring-rose-200",
};

const priceMood: Record<PriceLevel, { label: string; className: string }> = {
  free: { label: "можно смело", className: "bg-emerald-100 text-emerald-900" },
  low: { label: "легкая трата", className: "bg-cyan-100 text-cyan-900" },
  mid: { label: "проверить", className: "bg-amber-100 text-amber-950" },
  high: { label: "осторожно", className: "bg-rose-100 text-rose-900" },
};

type ActiveRoute = {
  mode: "main" | "planB";
  label: string;
  description: string;
  steps: TripStep[];
  prices: PriceItem[];
  budgetPlan: BudgetPlan;
  routeUrl: string;
  mapEmbedUrl: string;
  mapTitle: string;
};

type LiveWeatherRow = {
  date: string;
  summary: string;
  updatedAt: string;
};

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function renderRichTextParts(text: string) {
  return text.split(/(<s>.*?<\/s>)/g).map((part, index) => {
    const strikeMatch = part.match(/^<s>(.*)<\/s>$/);

    if (strikeMatch) {
      return <s key={`${part}-${index}`}>{strikeMatch[1]}</s>;
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function RichText({ text, className }: { text: string; className: string }) {
  return (
    <div className={classNames(className, "whitespace-pre-line")}>
      {text.split(/\n{2,}/).map((paragraph, index) => (
        <p key={`${paragraph}-${index}`}>{renderRichTextParts(paragraph)}</p>
      ))}
    </div>
  );
}

function getDefaultDayId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  if (year === 2026 && month === 6 && day >= 15 && day <= 19) {
    return `day-${day}`;
  }

  return tripDays[0].id;
}

function routeMessage(day: TripDay, commute: CommutePlan, meetingDone: boolean) {
  const meetingStatus = meetingDone
    ? "Встреча у Марьино подтверждена."
    : `Встреча у Марьино запланирована на ${commute.meetTime}.`;

  return `Все ок. ${meetingStatus} Мы на маршруте: ${day.date}, ${day.title}. Активный план отмечен в сайте. Контрольное время: ${day.timeRange}. Если меняем маршрут из-за погоды, напишем отдельно.`;
}

function yandexEmbedFromUrl(route: string) {
  return `https://yandex.ru/map-widget/v1/?${route.split("?")[1] ?? ""}`;
}

function singlePointMap(point: string) {
  const [lat, lon] = point.split(",");
  const pointParam = `${lon},${lat},pm2rdm`;

  return {
    routeUrl: `https://yandex.ru/maps/?ll=${lon},${lat}&z=15&pt=${pointParam}`,
    mapEmbedUrl: `https://yandex.ru/map-widget/v1/?ll=${lon},${lat}&z=15&pt=${pointParam}`,
  };
}

function buildRemainingMap(
  steps: TripStep[],
  done: Record<string, boolean>,
  fallbackRouteUrl: string,
  fallbackMapEmbedUrl: string,
) {
  const remainingPoints = steps
    .filter((step) => !done[step.id] && step.routePoint)
    .map((step) => step.routePoint as string);

  if (remainingPoints.length >= 2) {
    const rtt = new URL(fallbackRouteUrl).searchParams.get("rtt") ?? "pd";
    const routeUrl = `https://yandex.ru/maps/?rtext=${remainingPoints.join("~")}&rtt=${rtt}`;

    return {
      routeUrl,
      mapEmbedUrl: yandexEmbedFromUrl(routeUrl),
      mapTitle: "Оставшийся маршрут",
    };
  }

  if (remainingPoints.length === 1) {
    return {
      ...singlePointMap(remainingPoints[0]),
      mapTitle: "Следующая точка",
    };
  }

  return {
    routeUrl: fallbackRouteUrl,
    mapEmbedUrl: fallbackMapEmbedUrl,
    mapTitle: "Маршрут выполнен",
  };
}

function makeActiveRoute(day: TripDay, planB: boolean, done: Record<string, boolean>): ActiveRoute {
  const base = planB
    ? {
        mode: "planB" as const,
        label: day.planBRoute.label,
        description: day.planBRoute.description,
        steps: day.planBRoute.steps,
        prices: day.planBRoute.prices ?? day.prices,
        budgetPlan: day.planBRoute.budgetPlan ?? day.budgetPlan,
        routeUrl: day.planBRoute.routeUrl,
        mapEmbedUrl: day.planBRoute.mapEmbedUrl,
      }
    : {
        mode: "main" as const,
        label: "Маршрут на хорошую погоду",
        description: day.subtitle,
        steps: day.steps,
        prices: day.prices,
        budgetPlan: day.budgetPlan,
        routeUrl: day.routeUrl,
        mapEmbedUrl: day.mapEmbedUrl,
      };

  const remainingMap = buildRemainingMap(base.steps, done, base.routeUrl, base.mapEmbedUrl);

  return {
    ...base,
    ...remainingMap,
  };
}

function weatherCodeText(code: number) {
  if (code === 0) return "ясно";
  if ([1, 2, 3].includes(code)) return "переменная облачность";
  if ([45, 48].includes(code)) return "туман";
  if ([51, 53, 55, 56, 57].includes(code)) return "морось";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "дождь";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "снег";
  if ([95, 96, 99].includes(code)) return "гроза";
  return "прогноз";
}

function formatWeatherUpdate(value: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function TripGuide() {
  const [selectedDayId, setSelectedDayId] = useState(() => {
    if (typeof window === "undefined") {
      return tripDays[0].id;
    }

    return window.localStorage.getItem(activeDayStorageKey) ?? getDefaultDayId();
  });
  const [done, setDone] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") {
      return {};
    }

    const storedProgress = window.localStorage.getItem(progressStorageKey);
    if (!storedProgress) {
      return {};
    }

    try {
      return JSON.parse(storedProgress) as Record<string, boolean>;
    } catch {
      return {};
    }
  });
  const [priceFilter, setPriceFilter] = useState<PriceLevel | "all">("all");
  const [showPlanB, setShowPlanB] = useState(false);
  const [showParentPanel, setShowParentPanel] = useState(false);
  const [liveWeather, setLiveWeather] = useState<Record<string, LiveWeatherRow>>({});
  const [weatherUpdatedAt, setWeatherUpdatedAt] = useState<string | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(activeDayStorageKey, selectedDayId);
  }, [selectedDayId]);

  useEffect(() => {
    window.localStorage.setItem(progressStorageKey, JSON.stringify(done));
  }, [done]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadWeather() {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=55.7558&longitude=37.6173&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&timezone=Europe%2FMoscow&start_date=2026-06-15&end_date=2026-06-19",
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("weather response is not ok");
        }

        const data = (await response.json()) as {
          daily?: {
            time?: string[];
            weather_code?: number[];
            temperature_2m_max?: number[];
            temperature_2m_min?: number[];
            precipitation_probability_max?: number[];
            precipitation_sum?: number[];
          };
        };

        const rows: Record<string, LiveWeatherRow> = {};
        const times = data.daily?.time ?? [];
        times.forEach((isoDate, index) => {
          const date = new Date(`${isoDate}T12:00:00+03:00`);
          const label = new Intl.DateTimeFormat("ru-RU", {
            day: "numeric",
            month: "long",
          }).format(date);
          const max = data.daily?.temperature_2m_max?.[index];
          const min = data.daily?.temperature_2m_min?.[index];
          const rain = data.daily?.precipitation_probability_max?.[index];
          const precipitation = data.daily?.precipitation_sum?.[index];
          const code = data.daily?.weather_code?.[index] ?? -1;

          rows[label] = {
            date: label,
            summary: `${weatherCodeText(code)}, ${Math.round(min ?? 0)}-${Math.round(
              max ?? 0,
            )}°C, дождь ${Math.round(rain ?? 0)}%, осадки ${precipitation ?? 0} мм`,
            updatedAt: new Date().toISOString(),
          };
        });

        setLiveWeather(rows);
        setWeatherUpdatedAt(new Date().toISOString());
        setWeatherError(null);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setWeatherError("live-прогноз не загрузился, показываем запасные заметки");
        }
      }
    }

    void loadWeather();

    return () => controller.abort();
  }, []);

  const selectedDay = useMemo(
    () => tripDays.find((day) => day.id === selectedDayId) ?? tripDays[0],
    [selectedDayId],
  );

  const activeRoute = useMemo(
    () => makeActiveRoute(selectedDay, showPlanB, done),
    [selectedDay, showPlanB, done],
  );
  const activeCommute =
    showPlanB && selectedDay.planBRoute.commute ? selectedDay.planBRoute.commute : selectedDay.commute;
  const meetingKey = `${selectedDay.id}-${activeRoute.mode}-maryino-meeting`;
  const meetingDone = Boolean(done[meetingKey]);
  const completedCount = activeRoute.steps.filter((step) => done[step.id]).length;
  const progress = Math.round((completedCount / activeRoute.steps.length) * 100);
  const filteredPrices =
    priceFilter === "all"
      ? activeRoute.prices
      : activeRoute.prices.filter((item) => item.level === priceFilter);

  const accentVars = {
    "--accent": selectedDay.accent,
    "--accent-dark": selectedDay.accentDark,
    "--accent-soft": selectedDay.accentSoft,
  } as CSSProperties;

  return (
    <main style={accentVars} className="min-h-screen bg-[#f7f5ef] text-slate-950">
      <Hero
        day={selectedDay}
        progress={progress}
        completedCount={completedCount}
        totalCount={activeRoute.steps.length}
        activeRoute={activeRoute}
        showPlanB={showPlanB}
        onWeatherMode={(badWeather) => setShowPlanB(badWeather)}
      />

      <div className="sticky top-0 z-30 border-b border-black/10 bg-[#f7f5ef]/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3">
          {tripDays.map((day) => (
            <button
              key={day.id}
              type="button"
              onClick={() => {
                setSelectedDayId(day.id);
                setShowPlanB(false);
              }}
              className={classNames(
                "flex min-h-11 shrink-0 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition",
                day.id === selectedDay.id
                  ? "border-transparent text-white shadow-sm"
                  : "border-black/10 bg-white text-slate-700 hover:border-slate-400",
              )}
              style={day.id === selectedDay.id ? { backgroundColor: day.accentDark } : undefined}
            >
              <CalendarDays className="h-4 w-4" />
              {day.dayShort}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 pb-28 lg:grid-cols-[minmax(0,1fr)_390px]">
        <div className="space-y-6">
          <section id="route" className="space-y-4">
            <SectionTitle
              icon={<ListChecks className="h-5 w-5" />}
              label="Маршрут"
              title={
                showPlanB
                  ? "Шаги маршрута на плохую погоду"
                  : "Шаги маршрута на хорошую погоду"
              }
              right={`${completedCount}/${activeRoute.steps.length} готово`}
            />
            <div className="relative space-y-3">
              {activeRoute.steps.map((step, index) => (
                <RouteStepCard
                  key={step.id}
                  day={selectedDay}
                  step={step}
                  index={index}
                  done={Boolean(done[step.id])}
                  onToggle={() =>
                    setDone((current) => ({
                      ...current,
                      [step.id]: !current[step.id],
                    }))
                  }
                />
              ))}
            </div>
          </section>

          <section id="budget" className="space-y-4">
            <SectionTitle
              icon={<Wallet className="h-5 w-5" />}
              label="Бюджет"
              title="Кошелек без драмы"
              right="сначала дорога домой"
            />
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
              <div className="border-b border-black/10 bg-slate-50 p-4">
                <div className="grid gap-3 md:grid-cols-3">
                  <BudgetStat label="минимум" value={activeRoute.budgetPlan.minimum} />
                  <BudgetStat label="комфортно" value={activeRoute.budgetPlan.comfortable} />
                  <BudgetStat label="опасная зона" value={activeRoute.budgetPlan.caution} />
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr]">
                  <div className="rounded-xl bg-white p-3 text-sm leading-6 text-slate-600 ring-1 ring-black/5">
                    <div className="mb-1 font-semibold text-slate-950">Совет кошелька</div>
                    {activeRoute.budgetPlan.advice}
                  </div>
                  <div className="rounded-xl bg-white p-3 text-sm leading-6 text-slate-600 ring-1 ring-black/5">
                    <div className="mb-1 font-semibold text-slate-950">Дешевле и без грусти</div>
                    {activeRoute.budgetPlan.lowCostPlan}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {spendSizeTags.map((tag) => (
                    <span
                      key={tag.id}
                      className={classNames(
                        "rounded-full px-3 py-1.5 text-xs font-semibold ring-1",
                        priceStyles[tag.id],
                      )}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto border-b border-black/10 p-3">
                {priceFilters.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setPriceFilter(filter.id)}
                    className={classNames(
                      "min-h-10 shrink-0 rounded-xl px-3 text-sm font-semibold transition",
                      priceFilter === filter.id
                        ? "text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                    )}
                    style={
                      priceFilter === filter.id
                        ? { backgroundColor: selectedDay.accentDark }
                        : undefined
                    }
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <div className="divide-y divide-slate-100">
                {filteredPrices.map((item) => (
                  <div
                    key={item.title}
                    className="grid gap-3 px-4 py-4 sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)]"
                  >
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <span
                        className={classNames(
                          "mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                          priceMood[item.level].className,
                        )}
                      >
                        {priceMood[item.level].label}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-slate-600">{item.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <CommutePanel
            commute={activeCommute}
            meetingDone={meetingDone}
            onToggleMeeting={() =>
              setDone((current) => ({
                ...current,
                [meetingKey]: !current[meetingKey],
              }))
            }
          />

          <section id="weather" className="space-y-4">
            <SectionTitle
              icon={<CloudSun className="h-5 w-5" />}
              label="Погода"
              title="Что взять"
              right={
                weatherUpdatedAt
                  ? `обновлено ${formatWeatherUpdate(weatherUpdatedAt)}`
                  : weatherError ?? "загружаем live-прогноз"
              }
            />
            <div className="grid gap-3 md:grid-cols-2">
              {weatherRows.map((row) => (
                <div
                  key={row.date}
                  className={classNames(
                    "rounded-2xl border p-4 shadow-sm transition",
                    row.date === selectedDay.date
                      ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                      : "border-black/10 bg-white",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold">{row.date}</div>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {liveWeather[row.date]?.summary ?? row.forecast}
                  </p>
                  <p className="mt-3 flex items-start gap-2 text-sm font-semibold text-slate-900">
                    <Backpack className="mt-0.5 h-4 w-4 text-[var(--accent-dark)]" />
                    {row.take}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="safety" className="space-y-4">
            <SectionTitle
              icon={<ShieldCheck className="h-5 w-5" />}
              label="Спокойствие"
              title="Правила без паники"
              right="коротко и по делу"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <InfoList items={safetyRules} icon={<ShieldCheck className="h-4 w-4" />} />
              <InfoList items={adultWarnings} icon={<AlertTriangle className="h-4 w-4" />} tone="warn" />
            </div>
          </section>

          <section id="more" className="space-y-4">
            <SectionTitle
              icon={<RefreshCcw className="h-5 w-5" />}
              label="Замены"
              title="Если хочется иначе"
              right="без взрослой программы"
            />
            <div className="grid gap-4 md:grid-cols-3">
              {quickAlternatives.map((item) => (
                <a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-black/10 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--accent)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold">{item.title}</h3>
                    <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-[var(--accent-dark)]" />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-[var(--accent-dark)]">{item.price}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.when}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{item.text}</p>
                </a>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <MapPanel day={selectedDay} activeRoute={activeRoute} showPlanB={showPlanB} />
          <ParentPanel
            day={selectedDay}
            activeRoute={activeRoute}
            commute={activeCommute}
            meetingDone={meetingDone}
            open={showParentPanel}
            onToggle={() => setShowParentPanel((value) => !value)}
          />
          <SourcesPanel day={selectedDay} />
        </aside>
      </div>

      <MobileNav />
    </main>
  );
}

function Hero({
  day,
  progress,
  completedCount,
  totalCount,
  activeRoute,
  showPlanB,
  onWeatherMode,
}: {
  day: TripDay;
  progress: number;
  completedCount: number;
  totalCount: number;
  activeRoute: ActiveRoute;
  showPlanB: boolean;
  onWeatherMode: (badWeather: boolean) => void;
}) {
  return (
    <header className="relative min-h-[560px] overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-slate-900">
        <img
          src={day.heroImage}
          alt={day.imageAlt}
          className="h-full w-full object-cover opacity-70"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.35),rgba(15,23,42,0.92))]" />

      <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-4 py-10">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase text-white/75">
            {day.weekday}, {day.date}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            {day.title}
          </h1>
          <RichText text={day.subtitle} className="mt-5 max-w-3xl space-y-3 text-sm leading-6 text-white/86 sm:text-base sm:leading-7" />
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <HeroMetric icon={<Clock className="h-5 w-5" />} label="Время" value={day.timeRange} />
          <HeroMetric icon={<Wallet className="h-5 w-5" />} label="Бюджет" value={day.budgetShort} />
          <HeroMetric icon={<CloudSun className="h-5 w-5" />} label="Погода" value={day.weather} />
          <HeroMetric
            icon={<CheckCircle2 className="h-5 w-5" />}
            label="Прогресс"
            value={`${progress}% (${completedCount}/${totalCount})`}
          />
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={activeRoute.routeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 font-semibold text-slate-950 shadow-lg transition hover:bg-slate-100"
          >
            <Navigation className="h-5 w-5" />
            Открыть маршрут
          </a>
          <div className="inline-flex flex-wrap gap-2 rounded-2xl border border-white/20 bg-white/12 p-1 backdrop-blur">
            <button
              type="button"
              onClick={() => onWeatherMode(false)}
              aria-pressed={!showPlanB}
              className={classNames(
                "inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition",
                !showPlanB ? "bg-white text-slate-950 shadow-lg" : "text-white hover:bg-white/18",
              )}
            >
              <Sun className="h-5 w-5" />
              План на хорошую погоду
            </button>
            <button
              type="button"
              onClick={() => onWeatherMode(true)}
              aria-pressed={showPlanB}
              className={classNames(
                "inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition",
                showPlanB ? "bg-white text-slate-950 shadow-lg" : "text-white hover:bg-white/18",
              )}
            >
              <CloudRain className="h-5 w-5" />
              План на плохую погоду
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-h-[116px] rounded-2xl border border-white/18 bg-white/12 p-4 backdrop-blur">
      <div className="flex items-center gap-2 text-sm font-semibold text-white/72">
        {icon}
        {label}
      </div>
      <div className="mt-3 text-lg font-semibold leading-6">{value}</div>
    </div>
  );
}

function RouteStepCard({
  day,
  step,
  index,
  done,
  onToggle,
}: {
  day: TripDay;
  step: TripStep;
  index: number;
  done: boolean;
  onToggle: () => void;
}) {
  const image = step.image ?? day.heroImage;
  const imageAlt = step.imageAlt ?? step.title;

  return (
    <article className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-4 md:grid-cols-[168px_1fr]">
        <div className="relative min-h-36 overflow-hidden rounded-xl bg-slate-100 md:min-h-full">
          <img
            src={image}
            alt={imageAlt}
            className="h-full min-h-36 w-full object-cover"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-800 shadow-sm">
            {step.time}
          </div>
        </div>

        <div className="flex gap-4">
        <button
          type="button"
          onClick={onToggle}
          className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-slate-50 text-[var(--accent-dark)] transition hover:bg-[var(--accent-soft)]"
          aria-label={done ? "Снять отметку" : "Отметить шаг"}
        >
          {done ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
              {index + 1}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--accent-dark)]">
              <Clock className="h-3.5 w-3.5" />
              {step.time}
            </span>
            {step.adultOnly ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-800">
                <Users className="h-3.5 w-3.5" />
                со взрослым
              </span>
            ) : null}
          </div>

          <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
              {step.detail ? (
                <p className="mt-2 text-sm leading-6 text-slate-700">{step.detail}</p>
              ) : null}
            </div>
            {step.mapUrl ? (
              <a
                href={step.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl border border-black/10 px-3 text-sm font-semibold text-slate-700 transition hover:border-[var(--accent)] hover:text-[var(--accent-dark)]"
              >
                <MapPin className="h-4 w-4" />
                Точка
              </a>
            ) : null}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {step.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                {tag}
              </span>
            ))}
          </div>

          <details className="mt-4 rounded-xl border border-black/10 bg-slate-50 p-3 open:bg-white">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-slate-900">
              <BookOpen className="h-4 w-4 text-[var(--accent-dark)]" />
              Мини-гид: что это за место?
            </summary>
            <p className="mt-3 text-sm leading-6 text-slate-600">{step.guideText}</p>
            <p className="mt-3 flex items-start gap-2 text-sm font-semibold leading-6 text-slate-900">
              <Camera className="mt-0.5 h-4 w-4 text-[var(--accent-dark)]" />
              {step.tip}
            </p>
          </details>
        </div>
        </div>
      </div>
      {done ? (
        <div
          className="mt-4 rounded-xl px-3 py-2 text-sm font-semibold"
          style={{ backgroundColor: day.accentSoft, color: day.accentDark }}
        >
          Шаг закрыт. Маленькая победа, можно идти дальше.
        </div>
      ) : null}
    </article>
  );
}

function BudgetStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white p-3 ring-1 ring-black/5">
      <div className="text-xs font-semibold uppercase text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-semibold leading-5 text-slate-950">{value}</div>
    </div>
  );
}

function CommutePanel({
  commute,
  meetingDone,
  onToggleMeeting,
}: {
  commute: CommutePlan;
  meetingDone: boolean;
  onToggleMeeting: () => void;
}) {
  return (
    <section id="commute" className="space-y-4">
      <SectionTitle
        icon={<MapPin className="h-5 w-5" />}
        label="Как добраться"
        title="Старт от Марьино"
        right={meetingDone ? "встреча отмечена" : `встреча ${commute.meetTime}`}
      />
      <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-dark)]" />
              <div>
                <div className="font-semibold text-slate-950">{commute.meetingPoint}</div>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Встретиться в {commute.meetTime}, чтобы быть на первой точке к {commute.targetTime}.
                  Дорога: {commute.travelTime}.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {commute.outfitTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--accent-dark)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-xl border border-black/10 p-3 text-sm leading-6 text-slate-600">
              <div className="mb-1 font-semibold text-slate-950">Маршрут до первой точки</div>
              {commute.routeText}
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <a
                href={commute.routeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--accent-dark)] px-4 text-sm font-semibold text-white transition hover:brightness-110"
              >
                <Navigation className="h-4 w-4" />
                Открыть маршрут
              </a>
              <button
                type="button"
                onClick={onToggleMeeting}
                aria-pressed={meetingDone}
                className={classNames(
                  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition",
                  meetingDone
                    ? "border-transparent bg-[var(--accent-soft)] text-[var(--accent-dark)] ring-1 ring-[var(--accent)]"
                    : "border-black/10 text-slate-700 hover:border-[var(--accent)] hover:text-[var(--accent-dark)]",
                )}
              >
                {meetingDone ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                {meetingDone ? "Встретились" : "Встретились"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapPanel({
  day,
  activeRoute,
  showPlanB,
}: {
  day: TripDay;
  activeRoute: ActiveRoute;
  showPlanB: boolean;
}) {
  return (
    <section id="map" className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--accent-dark)]">
          <Map className="h-4 w-4" />
          Яндекс.Карта
        </div>
        <h2 className="mt-2 text-xl font-semibold">{activeRoute.mapTitle}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {day.date}: {activeRoute.label}
        </p>
        {showPlanB ? (
          <p className="mt-2 rounded-xl bg-[var(--accent-soft)] p-3 text-sm font-semibold text-[var(--accent-dark)]">
            Включен маршрут на плохую погоду: меньше улицы, больше крытых или коротких точек.
          </p>
        ) : null}
      </div>
      <iframe
        title={`Карта маршрута ${day.date}: ${activeRoute.label}`}
        src={activeRoute.mapEmbedUrl}
        className="h-[360px] w-full border-0"
        loading="lazy"
      />
      <div className="flex gap-2 p-4">
        <a
          href={activeRoute.routeUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--accent-dark)] px-4 text-sm font-semibold text-white transition hover:brightness-110"
        >
          <Navigation className="h-4 w-4" />
          Открыть
        </a>
        <a
          href={`https://yandex.ru/maps/?text=${encodeURIComponent("метро рядом")}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-black/10 px-4 text-sm font-semibold text-slate-700 transition hover:border-[var(--accent)]"
        >
          Метро
        </a>
      </div>
    </section>
  );
}

function ParentPanel({
  day,
  activeRoute,
  commute,
  meetingDone,
  open,
  onToggle,
}: {
  day: TripDay;
  activeRoute: ActiveRoute;
  commute: CommutePlan;
  meetingDone: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  const statusChips = [
    "Все ок",
    "Переходим к следующей точке",
    "Меняем маршрут из-за погоды",
    "Нужен созвон",
  ];

  return (
    <section className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-11 w-full items-center justify-between gap-3 text-left"
      >
        <span className="flex items-center gap-2 font-semibold">
          <Users className="h-5 w-5 text-[var(--accent-dark)]" />
          Родительский штаб
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {open ? "скрыть" : "открыть"}
        </span>
      </button>
      {open ? (
        <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
          <p>
            Чтобы взрослые не активировали режим “а где вы вообще?”, здесь лежит короткий статус дня.
          </p>
          <div className="flex flex-wrap gap-2">
            {statusChips.map((status) => (
              <span
                key={status}
                className="rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--accent-dark)]"
              >
                {status}
              </span>
            ))}
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <div className="mb-1 font-semibold text-slate-950">Сегодня</div>
            <p>
              <span className="font-semibold text-slate-950">{day.title}</span>. Активный режим:{" "}
              <span className="font-semibold text-slate-950">{activeRoute.label}</span>.
            </p>
            <p className="mt-2">Контрольное время: {day.timeRange}. Цены, погоду и билеты проверить утром.</p>
            <p className="mt-2">
              Встреча у Марьино:{" "}
              <span className="font-semibold text-slate-950">
                {meetingDone ? "подтверждена" : `ждем отметку к ${commute.meetTime}`}
              </span>
              .
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <div className="mb-2 font-semibold text-slate-950">Сообщение родителям</div>
            {routeMessage(day, commute, meetingDone)}
          </div>
          {day.adultNote ? (
            <div className="rounded-xl bg-rose-50 p-3 font-semibold text-rose-800">{day.adultNote}</div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function SourcesPanel({ day }: { day: TripDay }) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-[var(--accent-dark)]">
        <Ticket className="h-4 w-4" />
        Источники и билеты
      </div>
      <div className="mt-3 space-y-2">
        {day.sources.map((source) => (
          <a
            key={source.url}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-start justify-between gap-3 rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700 transition hover:bg-[var(--accent-soft)] hover:text-[var(--accent-dark)]"
          >
            {source.title}
            <ExternalLink className="mt-0.5 h-4 w-4 shrink-0" />
          </a>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">
        Данные собраны 11 июня 2026. Перед выходом цены, расписание и погоду лучше проверить еще раз.
      </p>
    </section>
  );
}

function SectionTitle({
  icon,
  label,
  title,
  right,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  right?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--accent-dark)]">
          {icon}
          {label}
        </div>
        <h2 className="mt-1 text-2xl font-semibold">{title}</h2>
      </div>
      {right ? <div className="text-sm font-semibold text-slate-500">{right}</div> : null}
    </div>
  );
}

function InfoList({
  items,
  icon,
  tone = "default",
}: {
  items: string[];
  icon: React.ReactNode;
  tone?: "default" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
            <span
              className={classNames(
                "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                tone === "warn" ? "bg-amber-50 text-amber-800" : "bg-[var(--accent-soft)] text-[var(--accent-dark)]",
              )}
            >
              {icon}
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileNav() {
  const items = [
    { href: "#route", label: "Шаги", icon: <ListChecks className="h-5 w-5" /> },
    { href: "#map", label: "Карта", icon: <MapPin className="h-5 w-5" /> },
    { href: "#budget", label: "Цены", icon: <Coins className="h-5 w-5" /> },
    { href: "#safety", label: "SOS", icon: <ShieldCheck className="h-5 w-5" /> },
  ];

  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-black/10 bg-white/94 p-2 shadow-2xl backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-4 gap-1">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-xs font-semibold text-slate-700 transition hover:bg-[var(--accent-soft)] hover:text-[var(--accent-dark)]"
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export function AttributionFooter() {
  return (
    <footer className="border-t border-black/10 bg-white px-4 py-8 text-center text-sm leading-6 text-slate-600">
      <div className="mx-auto max-w-3xl">
        Сайт подготовлен и разработан лично для Даши и Марианны сверх-интеллектом{" "}
        <span className="font-semibold text-slate-950">Mega Extra Hi GPT 5.5</span>.
      </div>
      <a
        href="#"
        className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl border border-black/10 px-4 font-semibold text-slate-700 hover:border-[var(--accent)]"
      >
        <Home className="h-4 w-4" />
        Наверх
      </a>
    </footer>
  );
}
