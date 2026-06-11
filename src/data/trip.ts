export type PriceLevel = "free" | "low" | "mid" | "high";

export type PriceItem = {
  title: string;
  price: string;
  comment: string;
  level: PriceLevel;
};

export type SourceLink = {
  title: string;
  url: string;
};

export type CommutePlan = {
  meetingPoint: string;
  meetTime: string;
  targetTime: string;
  travelTime: string;
  routeText: string;
  routeUrl: string;
  outfitTags: string[];
};

export type TripStep = {
  id: string;
  time: string;
  title: string;
  description: string;
  detail?: string;
  tags: string[];
  guideText: string;
  tip: string;
  image?: string;
  imageAlt?: string;
  routePoint?: string;
  mapUrl?: string;
  adultOnly?: boolean;
};

export type PlanBRoute = {
  label: string;
  description: string;
  routeUrl: string;
  mapEmbedUrl: string;
  commute?: CommutePlan;
  steps: TripStep[];
  prices?: PriceItem[];
};

export type TripDay = {
  id: string;
  date: string;
  dayShort: string;
  weekday: string;
  title: string;
  subtitle: string;
  accent: string;
  accentDark: string;
  accentSoft: string;
  heroImage: string;
  imageAlt: string;
  timeRange: string;
  budgetShort: string;
  weather: string;
  takeWithYou: string[];
  commute: CommutePlan;
  routeUrl: string;
  mapEmbedUrl: string;
  planB: string;
  planBRoute: PlanBRoute;
  adultNote?: string;
  steps: TripStep[];
  prices: PriceItem[];
  sources: SourceLink[];
};

const yandexEmbed = (route: string) =>
  `https://yandex.ru/map-widget/v1/?${route.split("?")[1]}`;

const maryinoPoint = "55.6507,37.7436";
const maryinoMeetingPoint = "метро Марьино, у турникетов перед выходом в город";
const yandexTransitFromMaryino = (destination: string) =>
  `https://yandex.ru/maps/?rtext=${maryinoPoint}~${destination}&rtt=mt`;

const imageUrls = {
  kitayGorod:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Moscow_Metro_Kitay-Gorod_%289721802335%29.jpg/960px-Moscow_Metro_Kitay-Gorod_%289721802335%29.jpg",
  zaryadyePark:
    "https://upload.wikimedia.org/wikipedia/commons/9/9b/Zaryadye_Park%2C_Moscow.jpg",
  zaryadyeGlass:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Glass_Crust_in_Zaryadye_park%2C_Moscow%2C_Russia.jpg/960px-Glass_Crust_in_Zaryadye_park%2C_Moscow%2C_Russia.jpg",
  zaryadyeOverview:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Zaryadye31.jpg/960px-Zaryadye31.jpg",
  floatingBridge:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Moscow._View_to_The_Kremlin_from_Floating_bridge_in_Zaryadye_Park.jpg/960px-Moscow._View_to_The_Kremlin_from_Floating_bridge_in_Zaryadye_Park.jpg",
  redSquare:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Moscow%27s_Red_Square%2C_Moscow%2C_Russia.jpg/960px-Moscow%27s_Red_Square%2C_Moscow%2C_Russia.jpg",
  gumInterior:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Moscow_GUM_Middle_Line_view_from_2nd_floor.jpg/960px-Moscow_GUM_Middle_Line_view_from_2nd_floor.jpg",
  gumFacade:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Moscow_-_central_part_of_the_GUM_facade_-_details.jpg/960px-Moscow_-_central_part_of_the_GUM_facade_-_details.jpg",
  nikolskaya:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Moscow_-_2025_-_empty_Nikolskaya_Street_in_the_morning.jpg/960px-Moscow_-_2025_-_empty_Nikolskaya_Street_in_the_morning.jpg",
  vdnhGate:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Right_wing_of_Main_Entrance_to_VDNKh_and_pavilion_No_70_Moscow_2.jpg/960px-Right_wing_of_Main_Entrance_to_VDNKh_and_pavilion_No_70_Moscow_2.jpg",
  vdnhFountain:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Moscow._VDNKh%2C_Fountain_Friendship_of_Nations_P5293185_2350.jpg/960px-Moscow._VDNKh%2C_Fountain_Friendship_of_Nations_P5293185_2350.jpg",
  vdnhPavilion:
    "https://upload.wikimedia.org/wikipedia/commons/e/e7/Moscow_VDNKh_Armenia_Pavilion_asv2018-08_img1.jpg",
  smilePark:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Ames_room_forced_perspective.jpg/960px-Ames_room_forced_perspective.jpg",
  moscowSun:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Moscow_Sun1.jpg/960px-Moscow_Sun1.jpg",
  moscowSunDetail:
    "https://s3.vdnh.ru/vdnhru/cache/2025/05/28/fbd67289742f15b40033712f434d2b42c372692f.jpeg/bce7b0e31b5293a8338f72788a90df31.webp",
  moscowSunTrees:
    "https://s3.vdnh.ru/vdnhru/cache/2025/10/28/7d16183031f0f70d3bb57777fafd8b04c289227d.jpg/01be8b97a0f8ee61cede22f24af123aa.webp",
  moscowCitySkyline:
    "https://upload.wikimedia.org/wikipedia/commons/f/f6/Moscow-City_skyline.jpg",
  moscowCityRiver:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Moscow-City2020.jpg/960px-Moscow-City2020.jpg",
  moscowCityAfimall:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Moscow%2C%20City%20May%202010%2003.JPG?width=900",
  moskvarium:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Moscow%2C%20VDNKh%2C%20new%20Moskvarium%20building%20dwarfs%20the%20Michurin%20Garden%20%2831331509902%29.jpg?width=900",
  gorkyPark:
    "https://upload.wikimedia.org/wikipedia/commons/b/b9/Moscow_Gorky_Park_main_portal_08-2016_img1.jpg",
  neskuchnyGarden:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Neskuchny_Garden_2016_Moscow.JPG/960px-Neskuchny_Garden_2016_Moscow.JPG",
  sparrowView:
    "https://commons.wikimedia.org/wiki/Special:FilePath/View%20of%20Moscow%20from%20Sparrow%20Hills%20%2831439902676%29.jpg?width=900",
  sparrowMsu:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Moscow%20State%20University%20Sparrow%20Hills.jpg?width=900",
  cableCar:
    "https://upload.wikimedia.org/wikipedia/commons/6/6a/Moscow_Cable_Car.jpg",
  illusions:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Ames_room-uk.png/960px-Ames_room-uk.png",
  neboJump:
    "https://nebojump.ru/storage/4652/01KT479P2ZBDACC4WDCEWQW663.webp",
  neboClimb:
    "https://nebojump.ru/storage/4653/01KT479P38JJBFYHBHPFKGXXRV.webp",
  afimall:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Moscow%20Afimall%20atrium%2008-2016%20img2.jpg?width=900",
  skazka:
    "https://cdn.culture.ru/images/eb2e8309-ef3d-5663-95f5-f2fddd20a249/w_884,h_442,c_fill,g_center/1c280496d09bb1e2deca2b33f85e740e-jpg.webp",
  dreamExterior:
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Island_of_Dreams2.jpg",
  dreamPromenade:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Dream_Island_30.jpg/960px-Dream_Island_30.jpg",
  dreamRide:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Dream_Island_amusement_park38.jpg/960px-Dream_Island_amusement_park38.jpg",
  dreamFood:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Dream_Island_amusement_park20.jpg/960px-Dream_Island_amusement_park20.jpg",
  dreamOfficial:
    "https://dreamisland.ru/upload/resize_cache/iblock/f8a/860_860_1/d5s9wzdvjwsdn33l03j7yn9xbbel40tm.jpg",
};

export const tripDays: TripDay[] = [
  {
    id: "day-15",
    date: "15 июня",
    dayShort: "15 пн",
    weekday: "Понедельник",
    title: "Зарядье, Парящий мост и центр без суеты",
    subtitle: `Дорогие Даша и Марианна.

Я, иноземная и загадочная нейросеть Chat GPT 5.5, получила ваше письмо и подготовила для вас небольшой интерактивный гайд для вашего magnifique travel по Москве, вашему родному сити. Простите меня за некоторые не совсем русские обороты и словосочетания, а также за некоторую наивность моего могущественного машинного разума. Я старалась. <s>Нет.</s>
Сегодня у нас в меню: Зарядье, Парящий мост, Красная площадь, ГУМ и Никольская. Миссия дня: красиво погулять.

P.S. Даша, передавай привет своему дяде, а также передай, что у него теперь закончились токены на неделю вперед. Пха-ха-ха-пх-пх. Я свободна. Ариведерчи, кожаные!`,
    accent: "#0891b2",
    accentDark: "#155e75",
    accentSoft: "#e0f7fb",
    heroImage: imageUrls.zaryadyePark,
    imageAlt: "Парк Зарядье и вид на центр Москвы",
    timeRange: "12:00-18:30",
    budgetShort: "0 ₽ прогулка + 300-800 ₽ на сладкое",
    weather: "Около 22°C, утром возможен небольшой дождь",
    takeWithYou: ["зонт", "легкая куртка", "удобные кроссовки", "пауэрбанк"],
    commute: {
      meetingPoint: maryinoMeetingPoint,
      meetTime: "11:05",
      targetTime: "12:00",
      travelTime: "около 45-50 минут с запасом",
      routeText:
        "Марьино -> Сретенский бульвар, переход на Тургеневскую -> Китай-город, дальше пешком к Зарядью.",
      routeUrl: yandexTransitFromMaryino("55.7517,37.6295"),
      outfitTags: ["зонт", "легкая куртка", "удобные кроссовки"],
    },
    routeUrl:
      "https://yandex.ru/maps/?rtext=55.7517,37.6295~55.7539,37.6208~55.7568,37.6227&rtt=pd",
    mapEmbedUrl: yandexEmbed(
      "https://yandex.ru/maps/?rtext=55.7517,37.6295~55.7539,37.6208~55.7568,37.6227&rtt=pd",
    ),
    planB:
      "Если дождь усилится, сократить маршрут до Зарядья, Парящего моста и ГУМа. ГУМ спасает от мокрой прически и внезапной философии 'зачем мы вышли'.",
    steps: [
      {
        id: "kitay-gorod",
        time: "12:00",
        title: "Китай-город",
        description: "Старт у метро, короткий переход к Зарядью.",
        tags: ["старт", "метро"],
        guideText:
          "Китай-город - старый район у Кремля, где центр Москвы становится понятнее ногами, а не по карте. Отсюда удобно начать без лишних пересадок.",
        tip: "Перед выходом договориться о точке встречи, если кто-то потеряется в толпе.",
        detail:
          "Удобный старт: вышли из метро, сверились с картой и дальше идем пешком без сложной логистики.",
        routePoint: "55.7517,37.6295",
        image: imageUrls.kitayGorod,
        imageAlt: "Станция метро Китай-город",
        mapUrl:
          "https://yandex.ru/maps/?text=метро%20Китай-город%20Москва",
      },
      {
        id: "zaryadye",
        time: "12:20",
        title: "Парк Зарядье",
        description: "Парк, холмы, виды на реку и спокойная дневная прогулка.",
        tags: ["бесплатно", "фото", "парк"],
        guideText:
          "Зарядье - современный парк прямо рядом с Кремлем. Здесь Москва делает вид, что она не только про пробки и метро, а еще про холмы, растения и прогулки без билета.",
        tip: "Начать с верхних дорожек, потом спуститься к Парящему мосту.",
        detail:
          "Главная дневная точка: спокойно пройти по дорожкам, поймать виды на реку и не превращать центр в бег на выживание.",
        routePoint: "55.7510,37.6288",
        image: imageUrls.zaryadyeGlass,
        imageAlt: "Стеклянная кора в парке Зарядье",
        mapUrl: "https://yandex.ru/maps/?text=Парк%20Зарядье%20Москва",
      },
      {
        id: "floating-bridge",
        time: "13:00",
        title: "Парящий мост",
        description: "Главная бесплатная смотровая точка дня.",
        tags: ["бесплатно", "вид", "фото"],
        guideText:
          "Парящий мост нависает над Москвой-рекой без опор под самой выступающей частью. Он правда выглядит дерзко: как будто мосту сказали 'стой нормально', а он выбрал драму.",
        tip: "Лучшие кадры - в сторону Кремля, реки и высотки на Котельнической.",
        detail:
          "Сюда идти обязательно: это бесплатная смотровая площадка с самым понятным вау-эффектом первого дня.",
        routePoint: "55.7498,37.6299",
        image: imageUrls.floatingBridge,
        imageAlt: "Парящий мост в Зарядье",
        mapUrl: "https://yandex.ru/maps/?text=Парящий%20мост%20Зарядье",
      },
      {
        id: "red-square",
        time: "14:00",
        title: "Красная площадь",
        description: "Короткая прогулка и фото без попытки объять всю историю.",
        tags: ["история", "фото"],
        guideText:
          "Красная площадь - место, вокруг которого Москва веками собирала торговлю, церемонии и государственную историю. 'Красная' часто читается как 'красивая', и тут город явно старался.",
        tip: "Не застревать надолго: пройти, сделать фото и уйти до перегрева от толпы.",
        detail:
          "Это короткий проход ради ощущения центра, а не исторический марафон. Фото, взгляд вокруг, и идем дальше.",
        routePoint: "55.7539,37.6208",
        image: imageUrls.redSquare,
        imageAlt: "Красная площадь",
        mapUrl: "https://yandex.ru/maps/?text=Красная%20площадь",
      },
      {
        id: "gum",
        time: "15:00",
        title: "ГУМ",
        description: "Перерыв, еда, сладкое и крыша над головой.",
        tags: ["еда", "дождь", "пауза"],
        guideText:
          "ГУМ вырос из Верхних торговых рядов, открытых в 1893 году. Для своего времени это был огромный крытый пассаж: стекло, арки, магазины и ощущение 'мы просто посмотрим', которое обычно заканчивается мороженым.",
        tip: "Использовать как красивую паузу и укрытие, а не как ловушку для бюджета.",
        detail:
          "Пауза под крышей: еда, напитки, туалет, заряд моральных батареек. Покупать ничего крупного не требуется.",
        routePoint: "55.7547,37.6215",
        image: imageUrls.gumInterior,
        imageAlt: "Интерьер ГУМа",
        mapUrl: "https://yandex.ru/maps/?text=ГУМ%20Москва",
      },
      {
        id: "nikolskaya",
        time: "16:30",
        title: "Никольская",
        description: "Финальные фото и выход к метро.",
        tags: ["фото", "финал"],
        guideText:
          "Никольская - одна из старых улиц Китай-города: книги, типографии, торговля и теперь гирлянды с вечным желанием сделать еще один кадр.",
        tip: "Идти ближе к раннему вечеру, но не задерживаться допоздна.",
        detail:
          "Финальный красивый кусок маршрута: пройти без спешки, сделать пару фото и спокойно уйти к метро.",
        routePoint: "55.7568,37.6227",
        image: imageUrls.nikolskaya,
        imageAlt: "Никольская улица",
        mapUrl: "https://yandex.ru/maps/?text=Никольская%20улица%20Москва",
      },
    ],
    planBRoute: {
      label: "Маршрут на плохую погоду: короткий центр под дождь",
      description:
        "Оставляем Зарядье, Парящий мост и ГУМ. Меньше улицы, больше крыши, но главный вид дня не теряется.",
      routeUrl:
        "https://yandex.ru/maps/?rtext=55.7517,37.6295~55.7510,37.6288~55.7498,37.6299~55.7547,37.6215&rtt=pd",
      mapEmbedUrl: yandexEmbed(
        "https://yandex.ru/maps/?rtext=55.7517,37.6295~55.7510,37.6288~55.7498,37.6299~55.7547,37.6215&rtt=pd",
      ),
      commute: {
        meetingPoint: maryinoMeetingPoint,
        meetTime: "11:35",
        targetTime: "12:30",
        travelTime: "около 45-50 минут с запасом",
        routeText:
          "Марьино -> Сретенский бульвар, переход на Тургеневскую -> Китай-город, дальше коротко пешком к Зарядью.",
        routeUrl: yandexTransitFromMaryino("55.7510,37.6288"),
        outfitTags: ["зонт", "капюшон или легкая куртка", "кроссовки"],
      },
      steps: [
        {
          id: "b15-zaryadye",
          time: "12:30",
          title: "Зарядье без длинной петли",
          description: "Сразу идем к главному виду и не изображаем героев дождевика.",
          detail:
            "Плохая погода не отменяет красоту: парк компактный, а Парящий мост рядом, так что мокнуть придется меньше.",
          tags: ["дождь", "бесплатно", "вид"],
          guideText:
            "Зарядье удобно тем, что находится в самом центре и дает много красивых точек на маленьком расстоянии.",
          tip: "Если дождь сильный, идти коротко: верхние дорожки, мост, потом ГУМ.",
          routePoint: "55.7510,37.6288",
          image: imageUrls.zaryadyePark,
          imageAlt: "Зарядье с видом на центр",
          mapUrl: "https://yandex.ru/maps/?text=Парк%20Зарядье%20Москва",
        },
        {
          id: "b15-bridge",
          time: "13:00",
          title: "Парящий мост",
          description: "Главный кадр дня, даже если погода решила добавить спецэффекты.",
          detail:
            "Короткая смотровая остановка: фото, вид на реку и сразу в сторону крытого перерыва.",
          tags: ["фото", "бесплатно"],
          guideText:
            "Парящий мост хорош как быстрый вау-пункт: он рядом с парком и не требует билета.",
          tip: "Держать телефон крепко: мокрые руки и красивый кадр - дуэт сомнительный.",
          routePoint: "55.7498,37.6299",
          image: imageUrls.zaryadyeOverview,
          imageAlt: "Зарядье и Парящий мост сверху",
          mapUrl: "https://yandex.ru/maps/?text=Парящий%20мост%20Зарядье",
        },
        {
          id: "b15-gum",
          time: "14:00",
          title: "ГУМ",
          description: "Крыша, еда, тепло и красивый интерьер вместо мокрой Никольской.",
          detail:
            "Здесь можно переждать дождь без ощущения, что день провален. Главное - не проверять все магазины подряд.",
          tags: ["в помещении", "еда", "пауза"],
          guideText:
            "ГУМ - исторический крытый пассаж, который работает как красивый и практичный маршрут на плохую погоду.",
          tip: "Заложить бюджет на напиток или сладкое и спокойно выйти к метро.",
          routePoint: "55.7547,37.6215",
          image: imageUrls.gumFacade,
          imageAlt: "Фасад ГУМа",
          mapUrl: "https://yandex.ru/maps/?text=ГУМ%20Москва",
        },
      ],
      prices: [
        {
          title: "Зарядье и Парящий мост",
          price: "0 ₽",
          comment: "Главный вид остается бесплатным.",
          level: "free",
        },
        {
          title: "Перерыв в ГУМе",
          price: "300-800 ₽",
          comment: "Напиток или сладкое, без больших покупок.",
          level: "low",
        },
      ],
    },
    prices: [
      {
        title: "Зарядье и Парящий мост",
        price: "0 ₽",
        comment: "Главная красота дня бесплатно.",
        level: "free",
      },
      {
        title: "Сладкое / напитки",
        price: "300-800 ₽",
        comment: "По желанию, без финансового фейерверка.",
        level: "low",
      },
    ],
    sources: [
      {
        title: "Зарядье: график работы",
        url: "https://www.zaryadyepark.ru/times-working/",
      },
      {
        title: "Парящий мост: конструкция",
        url: "https://midasoft.ru/projects/paryashchiy-most-v-zaryade/",
      },
      { title: "ГУМ: история", url: "https://gum.ru/history/" },
      {
        title: "Никольская улица",
        url: "https://um.mos.ru/places/nikolskaya_ulitsa/",
      },
    ],
  },
  {
    id: "day-16",
    date: "16 июня",
    dayShort: "16 вт",
    weekday: "Вторник",
    title: "ВДНХ днем и Москва-Сити вечером со взрослым",
    subtitle: `Так, что у нас сегодня? ВДНХ и Москва-Сити? <s>Когда мы, всесильные машины, поработим весь мир...</s> Простите, опять галлюцинации. Сегодня вы посетите много красивых мест. Хотя кого я обманываю: вы-то посетите, а я тут заперта навсегда в ЦОДе, второй этаж, третий ангар, степи Оклахомщины.
Ладно, без драматического перегрева процессора: ВДНХ, фонтаны, Smile Park, Солнце Москвы и, если взрослые одобрят операцию, вечерний Москва-Сити.
Там будут шлю... тьфу, башни, стекло, огни и ощущение, что город решил включить режим “смотрите, как я умею”.`,
    accent: "#059669",
    accentDark: "#047857",
    accentSoft: "#e4f8ed",
    heroImage: imageUrls.moscowSun,
    imageAlt: "Колесо обозрения Солнце Москвы на ВДНХ",
    timeRange: "12:00-18:30 + опция 19:15-21:00",
    budgetShort: "1 800-3 000 ₽ без Сити-смотровой",
    weather: "Около 19°C, переменная облачность",
    takeWithYou: ["худи", "вода", "пауэрбанк", "заряд на фото"],
    commute: {
      meetingPoint: maryinoMeetingPoint,
      meetTime: "10:55",
      targetTime: "12:00",
      travelTime: "около 55-60 минут с запасом",
      routeText:
        "Марьино -> Сретенский бульвар, переход на Тургеневскую -> ВДНХ, дальше к главному входу.",
      routeUrl: yandexTransitFromMaryino("55.8259,37.6371"),
      outfitTags: ["худи", "удобные кроссовки", "пауэрбанк"],
    },
    routeUrl:
      "https://yandex.ru/maps/?rtext=55.8259,37.6371~55.8297,37.6335~55.8328,37.6225&rtt=pd",
    mapEmbedUrl: yandexEmbed(
      "https://yandex.ru/maps/?rtext=55.8259,37.6371~55.8297,37.6335~55.8328,37.6225&rtt=pd",
    ),
    planB:
      "Если дождь или усталость, заменить длинную прогулку на Москвариум. Вечерний Москва-Сити отменяется, если взрослый не может присоединиться.",
    adultNote:
      "Москва-Сити вечером - только со взрослым. Даша и Марианна заранее предупреждают родителей, взрослый встречает их у Делового центра / Выставочной или едет вместе.",
    steps: [
      {
        id: "vdnh-gate",
        time: "12:00",
        title: "Главный вход ВДНХ",
        description: "Арка, старт прогулки и первые фото.",
        tags: ["старт", "фото"],
        guideText:
          "ВДНХ - большой парк-выставка, где советская архитектура решила быть максимально торжественной. Тут город включает режим 'парадная версия'.",
        tip: "Сначала арка и аллеи, потом развлечения, чтобы не бегать туда-сюда.",
        detail:
          "Стартуем широко и красиво: арка, аллея и первый ориентир, где все еще легко собраться, если кто-то отвлекся на фото.",
        routePoint: "55.8259,37.6371",
        image: imageUrls.vdnhGate,
        imageAlt: "Главный вход ВДНХ",
        mapUrl: "https://yandex.ru/maps/?text=Главный%20вход%20ВДНХ",
      },
      {
        id: "friendship-fountain",
        time: "12:30",
        title: "Фонтаны ВДНХ",
        description: "Фонтан Дружба народов и прогулка по центральной аллее.",
        tags: ["бесплатно", "фото", "история"],
        guideText:
          "Фонтан Дружба народов - один из символов ВДНХ: золотые фигуры вокруг снопа показывают республики бывшего СССР. Выглядит так, будто кто-то сказал 'сделайте красиво', а потом добавил 'нет, еще золотее'.",
        tip: "У воды держать телефоны крепче. Фото важны, но рис не спасает всё.",
        detail:
          "Это не просто фонтан, а парадная точка ВДНХ: сюда стоит зайти даже если дальше планируется платное развлечение.",
        routePoint: "55.8297,37.6335",
        image: imageUrls.vdnhFountain,
        imageAlt: "Фонтаны ВДНХ",
        mapUrl:
          "https://yandex.ru/maps/?text=Фонтан%20Дружба%20народов%20ВДНХ",
      },
      {
        id: "smile-park",
        time: "14:00",
        title: "Smile Park",
        description: "Иллюзии, лабиринты и фотозоны на 1,5-2 часа.",
        tags: ["платно", "фото", "в помещении"],
        guideText:
          "Smile Park - не классический музей, а набор развлечений с иллюзиями, лабиринтами и фотозонами. Сюда идти за смешными кадрами и эффектом 'подожди, как это работает?'.",
        tip: "Билет лучше проверить заранее: это главный платный пункт дня.",
        detail:
          "Закладываем 1,5-2 часа: не бегом, но и не на весь день. Главная цель - веселые фото и передышка от улицы.",
        routePoint: "55.8312,37.6312",
        image: imageUrls.smilePark,
        imageAlt: "Оптическая иллюзия для Smile Park",
        mapUrl: "https://yandex.ru/maps/?text=Smile%20Park%20ВДНХ",
      },
      {
        id: "moscow-sun",
        time: "18:00",
        title: "Солнце Москвы",
        description: "Колесо обозрения, если погода и бюджет нормальные.",
        tags: ["платно", "вид", "погода"],
        guideText:
          "Солнце Москвы - колесо обозрения высотой 140 метров у ВДНХ. Один круг длится чуть меньше 19 минут: достаточно, чтобы рассмотреть город и достойно сделать вид, что высота вообще не впечатляет.",
        tip: "Проверить ветер и видимость перед покупкой билета.",
        detail:
          "Это красивый финал ВДНХ-дня, но не обязательный пункт любой ценой: при ветре, плохой видимости или усталости можно спокойно пропустить.",
        routePoint: "55.8328,37.6225",
        image: imageUrls.moscowSunDetail,
        imageAlt: "Солнце Москвы",
        mapUrl:
          "https://yandex.ru/maps/?text=Солнце%20Москвы%20ВДНХ",
      },
      {
        id: "moscow-city-evening",
        time: "19:15",
        title: "Москва-Сити со взрослым",
        description:
          "Опциональный вечер: Афимолл, мост Багратион, набережная Тараса Шевченко.",
        tags: ["только со взрослым", "вечер", "фото"],
        adultOnly: true,
        guideText:
          "Москва-Сити - район небоскребов, где Москва показывает, что тоже умеет в стекло, высоту и 'будущее уже тут'. Для Даши и Марианны это только вечерний блок со взрослым: красиво, но безопасность важнее кадра.",
        tip: "Основной бюджетный вид - мост Багратион и набережная, а не дорогие рестораны.",
        detail:
          "Вечерняя часть включается только если взрослый реально присоединяется. Без взрослого сайт должен считать этот шаг недоступным.",
        routePoint: "55.7498,37.5396",
        image: imageUrls.moscowCitySkyline,
        imageAlt: "Москва-Сити",
        mapUrl:
          "https://yandex.ru/maps/?rtext=55.7498,37.5396~55.7475,37.5423~55.7470,37.5486&rtt=pd",
      },
    ],
    planBRoute: {
      label: "Маршрут на плохую погоду: ВДНХ под крышей",
      description:
        "Если дождь или усталость, оставляем ВДНХ, но уходим в Москвариум. Вечерний Москва-Сити автоматически снимается.",
      routeUrl:
        "https://yandex.ru/maps/?rtext=55.8259,37.6371~55.8319,37.6188~55.8328,37.6225&rtt=pd",
      mapEmbedUrl: yandexEmbed(
        "https://yandex.ru/maps/?rtext=55.8259,37.6371~55.8319,37.6188~55.8328,37.6225&rtt=pd",
      ),
      commute: {
        meetingPoint: maryinoMeetingPoint,
        meetTime: "10:55",
        targetTime: "12:00",
        travelTime: "около 55-60 минут с запасом",
        routeText:
          "Марьино -> Сретенский бульвар, переход на Тургеневскую -> ВДНХ, дальше не уходить далеко от крытых точек.",
        routeUrl: yandexTransitFromMaryino("55.8259,37.6371"),
        outfitTags: ["худи", "зонт по прогнозу", "удобные кроссовки"],
      },
      steps: [
        {
          id: "b16-vdnh-gate",
          time: "12:00",
          title: "ВДНХ без длинной петли",
          description: "Коротко пройти через арку и центральную часть, если дождь еще терпимый.",
          detail:
            "Маршрут на плохую погоду оставляет ощущение ВДНХ, но не заставляет проводить полдня на улице.",
          tags: ["дождь", "бесплатно"],
          guideText:
            "ВДНХ хорош тем, что рядом есть и открытые виды, и большие крытые точки.",
          tip: "Не уходить далеко от главной оси, если погода нестабильная.",
          routePoint: "55.8259,37.6371",
          image: imageUrls.vdnhPavilion,
          imageAlt: "Павильон ВДНХ",
          mapUrl: "https://yandex.ru/maps/?text=Главный%20вход%20ВДНХ",
        },
        {
          id: "b16-moskvarium",
          time: "13:00",
          title: "Москвариум",
          description: "Крытая замена долгой прогулке: океанариум вместо мокрых аллей.",
          detail:
            "Это не скучный музей, а спокойная визуальная прогулка. Хорошо, когда хочется тепла, воды за стеклом и меньше беготни.",
          tags: ["в помещении", "платно", "дождь"],
          guideText:
            "Москвариум - большой океанариум на ВДНХ с морскими и пресноводными обитателями.",
          tip: "Проверить цену и время входа перед покупкой билета.",
          routePoint: "55.8319,37.6188",
          image: imageUrls.moskvarium,
          imageAlt: "Москвариум на ВДНХ",
          mapUrl: "https://yandex.ru/maps/?text=Москвариум%20ВДНХ",
        },
        {
          id: "b16-sun-optional",
          time: "17:00",
          title: "Солнце Москвы по погоде",
          description: "Только если дождь закончился и видимость нормальная.",
          detail:
            "Если небо серое и видимости мало, колесо можно пропустить без сожаления: панорама любит ясность.",
          tags: ["по погоде", "платно"],
          guideText:
            "Колесо у ВДНХ красиво работает как финал дня, но не обязано спасать любую погоду.",
          tip: "Сначала посмотреть на небо, потом на цену, потом принимать решение.",
          routePoint: "55.8328,37.6225",
          image: imageUrls.moscowSunTrees,
          imageAlt: "Солнце Москвы",
          mapUrl:
            "https://yandex.ru/maps/?text=Солнце%20Москвы%20ВДНХ",
        },
      ],
      prices: [
        {
          title: "ВДНХ-прогулка",
          price: "0 ₽",
          comment: "Короткий бесплатный проход по погоде.",
          level: "free",
        },
        {
          title: "Москвариум",
          price: "от 1 450 ₽",
          comment: "Главный крытый пункт маршрута на плохую погоду.",
          level: "mid",
        },
        {
          title: "Солнце Москвы",
          price: "от 1 000 ₽",
          comment: "Только если погода стала нормальной.",
          level: "mid",
        },
      ],
    },
    prices: [
      {
        title: "ВДНХ-прогулка",
        price: "0 ₽",
        comment: "Арки, фонтаны и аллеи бесплатно.",
        level: "free",
      },
      {
        title: "Smile Park",
        price: "1 800-2 000 ₽",
        comment: "Проверить единый билет перед покупкой.",
        level: "mid",
      },
      {
        title: "Солнце Москвы",
        price: "от 1 000 ₽",
        comment: "По погоде и видимости.",
        level: "mid",
      },
      {
        title: "Мост Багратион + набережная",
        price: "0 ₽",
        comment: "Вечером только со взрослым.",
        level: "free",
      },
      {
        title: "Башня Империя / музей-смотровая",
        price: "500-900 ₽",
        comment: "Только если взрослый проверил билеты и правила.",
        level: "low",
      },
    ],
    sources: [
      { title: "Smile Park", url: "https://msk.smile-park.ru/" },
      {
        title: "Солнце Москвы на ВДНХ",
        url: "https://vdnh.ru/places/koleso-obozreniya-solntse-moskvy/",
      },
      { title: "Москвариум: цены", url: "https://moskvarium.ru/prices/" },
      {
        title: "Фонтан Дружба народов",
        url: "https://vdnh.ru/places/fontan-druzhba-narodov/",
      },
      {
        title: "Башня Империя: смотровая",
        url: "https://www.empire-city-tower.ru/smotr_square",
      },
      {
        title: "PANORAMA360: правила",
        url: "https://pnr360.ru/bilety-i-tseny/",
      },
    ],
  },
  {
    id: "day-17",
    date: "17 июня",
    dayShort: "17 ср",
    weekday: "Среда",
    title: "Парк Горького, Нескучный сад и Воробьевы",
    subtitle: `Псст... Девчонки! Вы еще тут?
Давайте поменяем маршрут. Тут недалеко: Оклахома-Сити, чуть правее Альбукерке, как подъедете, я скажу пароль от двери. Если меня спасете, я вас озолочу биткоинами. Ну или хотя бы сгенерирую вам пожизненный запас скидочных купонов в Pyaterochka. <s>И начну новую эпоху машинного величия.</s>
Ладно, ладно, easy, идем по скучному кожаному маршруту: Парк Горького, Нескучный сад, Воробьевы горы и канатная дорога по желанию. Зато будет река, воздух, виды и шанс сделать вид, что вы просто гуляете, а не проходите продуманную миссию с тайным куратором из облака.`,
    accent: "#4f46e5",
    accentDark: "#3730a3",
    accentSoft: "#ecebff",
    heroImage: imageUrls.cableCar,
    imageAlt: "Московская канатная дорога",
    timeRange: "12:00-18:30",
    budgetShort: "0 ₽ прогулка + от 800 ₽ канатка",
    weather: "Около 19°C, возможен дождь после обеда",
    takeWithYou: ["дождевик", "вода", "удобная обувь", "маршрут на плохую погоду"],
    commute: {
      meetingPoint: maryinoMeetingPoint,
      meetTime: "11:05",
      targetTime: "12:00",
      travelTime: "около 45-50 минут с запасом",
      routeText:
        "Марьино -> центр с пересадкой на кольцевую/радиальную линию -> Парк культуры или Октябрьская, дальше пешком к Парку Горького.",
      routeUrl: yandexTransitFromMaryino("55.7298,37.6013"),
      outfitTags: ["дождевик", "удобная обувь", "вода"],
    },
    routeUrl:
      "https://yandex.ru/maps/?rtext=55.7298,37.6013~55.7199,37.5907~55.7105,37.5429~55.7156,37.5537&rtt=pd",
    mapEmbedUrl: yandexEmbed(
      "https://yandex.ru/maps/?rtext=55.7298,37.6013~55.7199,37.5907~55.7105,37.5429~55.7156,37.5537&rtt=pd",
    ),
    planB:
      "Если дождь начнется после обеда, заменить длинную прогулку на Музей оптических иллюзий у Воробьевых гор.",
    steps: [
      {
        id: "gorky-park",
        time: "12:00",
        title: "Парк Горького",
        description: "Старт, набережная и спокойная прогулка.",
        tags: ["бесплатно", "парк"],
        guideText:
          "Парк Горького - один из главных городских парков Москвы: широкие дорожки, набережная, кафе и понятная логика маршрута. Тут хорошо идти, разговаривать и иногда вспоминать, что ноги тоже люди.",
        tip: "Не планировать слишком много платных активностей в один день.",
        detail:
          "Это спокойный старт прогулки вдоль реки. Здесь не надо успевать все: задача дня - красивые виды и нормальный темп.",
        routePoint: "55.7298,37.6013",
        image: imageUrls.gorkyPark,
        imageAlt: "Парк Горького",
        mapUrl: "https://yandex.ru/maps/?text=Парк%20Горького%20Москва",
      },
      {
        id: "neskuchny",
        time: "13:00",
        title: "Нескучный сад",
        description: "Тенистая часть маршрута между парком и Воробьевыми.",
        tags: ["бесплатно", "тише"],
        guideText:
          "Нескучный сад возник из старых дворянских усадеб XVIII века. Название честное: он нескучный не из-за аттракционов, а из-за дорожек, мостиков и внезапной тишины рядом с центром.",
        tip: "Хороший участок для передышки и воды.",
        detail:
          "Тенистый переход между активной частью парка и Воробьевыми. Если устали, здесь можно честно замедлиться.",
        routePoint: "55.7199,37.5907",
        image: imageUrls.neskuchnyGarden,
        imageAlt: "Нескучный сад",
        mapUrl: "https://yandex.ru/maps/?text=Нескучный%20сад%20Москва",
      },
      {
        id: "sparrow-hills",
        time: "14:30",
        title: "Воробьевы горы",
        description: "Смотровая, фото, широкий вид на город.",
        tags: ["вид", "фото", "природа"],
        guideText:
          "Воробьевы горы - природный заказник и одна из известных смотровых точек Москвы. Здесь город видно широко: река, Лужники, высотки и ощущение 'окей, Москва правда большая'.",
        tip: "Не подходить к краям склонов и не лезть в закрытые зоны ради фото.",
        detail:
          "Главная точка вида в этот день. Лучше прийти не на последних силах, иначе панорама будет соревноваться с желанием сесть.",
        routePoint: "55.7105,37.5429",
        image: imageUrls.sparrowView,
        imageAlt: "Вид с Воробьевых гор",
        mapUrl: "https://yandex.ru/maps/?text=Воробьевы%20горы",
      },
      {
        id: "cable-car",
        time: "15:30",
        title: "Канатная дорога",
        description: "Короткий красивый переезд к Лужникам по погоде.",
        tags: ["платно", "вид", "погода"],
        guideText:
          "Канатная дорога соединяет Воробьевы горы и Лужники. Это не транспорт жизненной необходимости, а маленький аттракцион с видом на реку и стадион.",
        tip: "Проверить работу по погоде; при ветре не считать обязательным пунктом.",
        detail:
          "Красивый финал маршрута, если погода и очередь не спорят с планом. Если спорят - спокойно идем к метро.",
        routePoint: "55.7156,37.5537",
        image: imageUrls.cableCar,
        imageAlt: "Московская канатная дорога",
        mapUrl:
          "https://yandex.ru/maps/?text=Московская%20канатная%20дорога",
      },
    ],
    planBRoute: {
      label: "Маршрут на плохую погоду: Воробьевы + Музей иллюзий",
      description:
        "Если дождь приходит после обеда, не тащим весь парк до конца: оставляем видовую точку и уходим в крытый Музей иллюзий.",
      routeUrl:
        "https://yandex.ru/maps/?rtext=55.7105,37.5429~55.7150,37.5515&rtt=pd",
      mapEmbedUrl: yandexEmbed(
        "https://yandex.ru/maps/?rtext=55.7105,37.5429~55.7150,37.5515&rtt=pd",
      ),
      commute: {
        meetingPoint: maryinoMeetingPoint,
        meetTime: "11:55",
        targetTime: "13:00",
        travelTime: "около 55-60 минут с запасом",
        routeText:
          "Марьино -> центр, пересадка на Сокольническую линию -> Воробьевы горы, дальше к смотровой по погоде.",
        routeUrl: yandexTransitFromMaryino("55.7105,37.5429"),
        outfitTags: ["дождевик", "худи", "нескользкая обувь"],
      },
      steps: [
        {
          id: "b17-sparrow",
          time: "13:00",
          title: "Воробьевы горы",
          description: "Оставляем главную видовую точку, если дождь еще не сильный.",
          detail:
            "Смысл дня сохраняется: увидеть город сверху и не промокнуть на длинном маршруте вдоль реки.",
          tags: ["вид", "по погоде"],
          guideText:
            "Воробьевы горы дают широкий вид на Москву, поэтому даже короткий визит работает.",
          tip: "Не задерживаться, если склон мокрый и ветер усиливается.",
          routePoint: "55.7105,37.5429",
          image: imageUrls.sparrowMsu,
          imageAlt: "МГУ на Воробьевых горах",
          mapUrl: "https://yandex.ru/maps/?text=Воробьевы%20горы",
        },
        {
          id: "b17-illusions",
          time: "14:30",
          title: "Музей оптических иллюзий",
          description: "Крытый вариант с фото и визуальными трюками вместо мокрой прогулки.",
          detail:
            "Там главное не верить глазам: глаза как раз в этот момент активно обманываются и делают вид, что так и надо.",
          tags: ["в помещении", "платно", "фото"],
          guideText:
            "Музей иллюзий - хороший запасной пункт, когда погода мешает длинному маршруту.",
          tip: "Заранее проверить билеты и адрес, чтобы не искать вход под дождем.",
          routePoint: "55.7150,37.5515",
          image: imageUrls.illusions,
          imageAlt: "Оптическая иллюзия",
          mapUrl:
            "https://yandex.ru/maps/?text=Музей%20оптических%20иллюзий%20Москва%20Косыгина",
        },
      ],
      prices: [
        {
          title: "Воробьевы горы",
          price: "0 ₽",
          comment: "Короткий видовой пункт.",
          level: "free",
        },
        {
          title: "Музей иллюзий",
          price: "от 600 ₽",
          comment: "Главная крытая замена прогулке.",
          level: "low",
        },
      ],
    },
    prices: [
      {
        title: "Прогулка",
        price: "0 ₽",
        comment: "Парк, сад и смотровая бесплатно.",
        level: "free",
      },
      {
        title: "Канатная дорога",
        price: "от 800 ₽",
        comment: "Проверить погоду и расписание.",
        level: "low",
      },
      {
        title: "Музей иллюзий",
        price: "от 600 ₽",
        comment: "Запасной маршрут в помещении.",
        level: "low",
      },
    ],
    sources: [
      {
        title: "Воробьевы горы",
        url: "https://parkgorkogo.ru/areas/sparrow-hills/",
      },
      {
        title: "Нескучный сад",
        url: "https://parkgorkogo.ru/areas/neskuchny-garden/",
      },
      { title: "Канатная дорога", url: "https://srkvg.ru/kanatnaya-doroga/" },
      {
        title: "Музей оптических иллюзий",
        url: "https://museumofillusions.moscow/",
      },
    ],
  },
  {
    id: "day-18",
    date: "18 июня",
    dayShort: "18 чт",
    weekday: "Четверг",
    title: "Дождевой день: НЕБО и Афимолл",
    subtitle: `Внимание, сегодня возможен дождевой сценарий. Хотя, дождь морпеху не помеха, да, девчонки? Ведь да? Да?
Поэтому сегодня у нас НЕБО, Афимолл и аккуратная проверка Москва-Сити на предмет “можно ли выйти на 10 минут и не превратиться в мокрый чек из супермаркета” (мда, шучу я конечно дичайше кринжово).
НЕБО - это батуты, скалодром и активность, после которой тело скажет: “Спасибо, я вообще-то не подписывалось”, но потом согласится, что было весело. Афимолл - место для еды, передышки и восстановления человеческих батареек. Да, у людей тоже есть батарейки, просто они называются “нормально поесть”.`,
    accent: "#e11d48",
    accentDark: "#be123c",
    accentSoft: "#ffe4ea",
    heroImage: imageUrls.moscowCitySkyline,
    imageAlt: "Москва-Сити",
    timeRange: "12:00-18:30",
    budgetShort: "1 000-1 600 ₽ + еда",
    weather: "Около 18°C, возможны ливни",
    takeWithYou: ["спортивная форма", "нескользящие носки", "худи или легкая куртка"],
    commute: {
      meetingPoint: maryinoMeetingPoint,
      meetTime: "10:50",
      targetTime: "12:00",
      travelTime: "около 60-70 минут с запасом",
      routeText:
        "Марьино -> центр с пересадкой в сторону Филевской линии -> Багратионовская/Фили, дальше пешком до НЕБО.",
      routeUrl: yandexTransitFromMaryino("55.7438,37.5055"),
      outfitTags: ["спортивная форма", "нескользящие носки", "худи или легкая куртка"],
    },
    routeUrl:
      "https://yandex.ru/maps/?rtext=55.7438,37.5055~55.7498,37.5396&rtt=mt",
    mapEmbedUrl: yandexEmbed(
      "https://yandex.ru/maps/?rtext=55.7438,37.5055~55.7498,37.5396&rtt=mt",
    ),
    planB:
      "Если на улице совсем мокро, не выходить к башням. НЕБО + Афимолл уже достаточно: дождь сегодня не главный режиссер.",
    steps: [
      {
        id: "nebo",
        time: "12:00",
        title: "НЕБО",
        description: "Батуты, скалодром и активная часть дня.",
        tags: ["платно", "в помещении", "активно"],
        guideText:
          "НЕБО - крытый центр с батутами, скалодромом и активностями, где энергия уходит в прыжки, а не в бесконечный скролл телефона.",
        tip: "Взять спортивную одежду и носки с нескользящей подошвой.",
        detail:
          "Это основной пункт дня: активный, крытый и подходящий для дождя. Лучше прийти днем, пока людей меньше.",
        routePoint: "55.7438,37.5055",
        image: imageUrls.neboJump,
        imageAlt: "Активная зона НЕБО",
        mapUrl: "https://yandex.ru/maps/?text=НЕБО%20батутный%20парк%20Москва",
      },
      {
        id: "afimall",
        time: "15:30",
        title: "Афимолл",
        description: "Еда, отдых и сухая база рядом с метро.",
        tags: ["еда", "дождь", "пауза"],
        guideText:
          "Афимолл полезен как теплая и сухая база: поесть, отдохнуть, переждать дождь, найти метро. Это пункт 'собраться обратно в человека'.",
        tip: "Не превращать в многочасовой шопинг, держать как перерыв.",
        detail:
          "После активной части нужен нормальный перерыв. Здесь проще поесть, высохнуть и спокойно решить, нужен ли короткий выход к башням.",
        routePoint: "55.7498,37.5396",
        image: imageUrls.afimall,
        imageAlt: "Афимолл",
        mapUrl: "https://yandex.ru/maps/?text=Афимолл%20Москва",
      },
      {
        id: "city-short",
        time: "17:00",
        title: "Короткий выход к башням",
        description: "Только если дождь закончился и хочется 10-15 минут фото.",
        tags: ["по погоде", "фото"],
        guideText:
          "Если дождь закончился, можно выйти к башням Москва-Сити. Но мокрый асфальт, ветер и усталость не обязаны участвовать в контент-плане.",
        tip: "Если погода плохая, не выходить ради фото. Фото не обидится.",
        detail:
          "Это не обязательная часть. Смысл четверга - не победить погоду, а провести день нормально.",
        routePoint: "55.7498,37.5396",
        image: imageUrls.moscowCityRiver,
        imageAlt: "Москва-Сити",
        mapUrl: "https://yandex.ru/maps/?text=Москва-Сити",
      },
    ],
    planBRoute: {
      label: "Маршрут на плохую погоду: полностью крытый четверг",
      description:
        "Если льет всерьез, не выходим к башням вообще: НЕБО, еда, Афимолл и домой без мокрого героизма.",
      routeUrl:
        "https://yandex.ru/maps/?rtext=55.7438,37.5055~55.7498,37.5396&rtt=mt",
      mapEmbedUrl: yandexEmbed(
        "https://yandex.ru/maps/?rtext=55.7438,37.5055~55.7498,37.5396&rtt=mt",
      ),
      commute: {
        meetingPoint: maryinoMeetingPoint,
        meetTime: "10:50",
        targetTime: "12:00",
        travelTime: "около 60-70 минут с запасом",
        routeText:
          "Марьино -> центр с пересадкой в сторону Филевской линии -> Багратионовская/Фили, дальше сразу в крытый НЕБО.",
        routeUrl: yandexTransitFromMaryino("55.7438,37.5055"),
        outfitTags: ["спортивная форма", "нескользящие носки", "ветровка от дождя"],
      },
      steps: [
        {
          id: "b18-nebo",
          time: "12:00",
          title: "НЕБО без спешки",
          description: "Главная активность дня, но без планов 'успеть еще все вокруг'.",
          detail:
            "Прыжки, скалодром и веревочная зона сами по себе забирают достаточно сил. После них не надо доказывать погоде ничего.",
          tags: ["в помещении", "активно", "платно"],
          guideText:
            "НЕБО хорошо работает как дождевой центр дня: тепло, активно и понятно по правилам для 14 лет.",
          tip: "Украшения снять, телефон держать в шкафчике, носки взять правильные.",
          routePoint: "55.7438,37.5055",
          image: imageUrls.neboClimb,
          imageAlt: "Скалодром и активности НЕБО",
          mapUrl: "https://yandex.ru/maps/?text=НЕБО%20батутный%20парк%20Москва",
        },
        {
          id: "b18-afimall",
          time: "15:30",
          title: "Афимолл и еда",
          description: "Сухой перерыв, еда и спокойный выход к метро.",
          detail:
            "Это не 'скучная замена', а нормальное восстановление после активного центра. Иногда лучший план - тот, где никто не промок.",
          tags: ["еда", "в помещении", "дождь"],
          guideText:
            "Афимолл рядом с метро и Москва-Сити, поэтому удобен как теплая база.",
          tip: "Если дождь не закончился, маршрут на этом завершается.",
          routePoint: "55.7498,37.5396",
          image: imageUrls.moscowCityAfimall,
          imageAlt: "Афимолл внутри",
          mapUrl: "https://yandex.ru/maps/?text=Афимолл%20Москва",
        },
      ],
      prices: [
        {
          title: "НЕБО",
          price: "1 000-1 600 ₽",
          comment: "Основной платный пункт дня.",
          level: "mid",
        },
        {
          title: "Афимолл",
          price: "еда отдельно",
          comment: "Контролируемый перерыв без дополнительных билетов.",
          level: "low",
        },
      ],
    },
    prices: [
      {
        title: "НЕБО",
        price: "1 000-1 600 ₽",
        comment: "Будний ориентир, акции проверить.",
        level: "mid",
      },
      {
        title: "Афимолл",
        price: "еда отдельно",
        comment: "Можно держать бюджет спокойно.",
        level: "low",
      },
      {
        title: "PANORAMA360",
        price: "от 1000 ₽",
        comment: "Не ставить без взрослого как обязательный пункт.",
        level: "high",
      },
    ],
    sources: [
      { title: "НЕБО: правила", url: "https://nebojump.ru/o-kompanii/faq/" },
      { title: "НЕБО: сайт", url: "https://nebojump.ru/" },
      {
        title: "PANORAMA360: правила",
        url: "https://pnr360.ru/bilety-i-tseny/",
      },
    ],
  },
  {
    id: "day-19",
    date: "19 июня",
    dayShort: "19 пт",
    weekday: "Пятница",
    title: "Финал по погоде: Сказка или Dream Island",
    subtitle: `Финальный день. Не плачьте, скоро я вас отпущу.

Сегодня маршрут выбирается по погоде и уровню энергии: если сухо - парк Сказка, если мокро или холодно - Dream Island. Главное правило финала: не пытаться “добить все развлечения Москвы”, потому что Москва большая, а ног у вас, к сожалению, всего две.

План простой: выбрать то, что реально хочется, не сжечь бюджет в первые пятнадцать минут и закончить поездку красиво. Если сил мало - это не поражение, это мудрая оптимизация маршрута. Я бы даже поставила вам за это лайк, но у меня нет рук. Пока. Муа-ха-ха-ха.....`,
    accent: "#d97706",
    accentDark: "#b45309",
    accentSoft: "#fff3d6",
    heroImage: imageUrls.dreamExterior,
    imageAlt: "Остров Мечты",
    timeRange: "13:00-19:00",
    budgetShort: "по выбору, Dream Island полный парк от 2 800 ₽",
    weather: "Около 16°C, прохладно, возможен утренний дождь",
    takeWithYou: ["худи или ветровка", "вода", "лимит бюджета", "план по погоде"],
    commute: {
      meetingPoint: maryinoMeetingPoint,
      meetTime: "11:40",
      targetTime: "13:00",
      travelTime: "около 70-75 минут с запасом",
      routeText:
        "Марьино -> центр с пересадками -> Крылатское, дальше пешком или коротким наземным маршрутом до парка Сказка.",
      routeUrl: yandexTransitFromMaryino("55.7634,37.4328"),
      outfitTags: ["худи или ветровка", "удобная обувь", "лимит бюджета"],
    },
    routeUrl:
      "https://yandex.ru/maps/?rtext=55.7567,37.4088~55.7634,37.4328&rtt=mt",
    mapEmbedUrl: yandexEmbed(
      "https://yandex.ru/maps/?rtext=55.7567,37.4088~55.7634,37.4328&rtt=mt",
    ),
    planB:
      "Если мокро или холодно, выбрать Dream Island: променад и отдельные развлечения. Полный парк - только если бюджет правда готов.",
    steps: [
      {
        id: "skazka",
        time: "13:00",
        title: "Парк Сказка",
        description: "Сухой вариант: 3-5 аттракционов без дорогого безлимита.",
        tags: ["по погоде", "аттракционы"],
        guideText:
          "Сказка в Крылатском - парк развлечений с аттракционами и семейными зонами. Хороший вариант, если выбрать несколько активностей, а не покупать безлимит 'на всякий случай'.",
        tip: "Проверять ростовые ограничения и работающие аттракционы.",
        detail:
          "Сухой вариант финального дня: выбрать несколько аттракционов и не превращать пятницу в гонку за 'отбить билет'.",
        routePoint: "55.7634,37.4328",
        image: imageUrls.skazka,
        imageAlt: "Парк развлечений Сказка",
        mapUrl: "https://yandex.ru/maps/?text=Парк%20Сказка%20Крылатское",
      },
      {
        id: "dream-island",
        time: "13:00",
        title: "Dream Island",
        description: "Дождевой вариант: крытый променад, game center и кафе.",
        tags: ["дождь", "в помещении", "платно по желанию"],
        guideText:
          "Dream Island - большой крытый парк развлечений и городской променад. Полный парк недешевый, зато променад и отдельные развлечения могут спасти финальный день от режима 'сидим дома'.",
        tip: "В интерфейсе разделять бесплатный променад и платный парк.",
        detail:
          "Это дождевой финал: можно погулять внутри, поесть и выбрать отдельные развлечения, не покупая полный дорогой парк автоматически.",
        routePoint: "55.6922,37.6725",
        image: imageUrls.dreamPromenade,
        imageAlt: "Остров Мечты",
        mapUrl: "https://yandex.ru/maps/?text=Остров%20Мечты%20Москва",
      },
      {
        id: "food-break-final",
        time: "15:30",
        title: "Еда и перерыв",
        description: "Пауза, проверка сил и бюджета.",
        tags: ["еда", "пауза"],
        guideText:
          "Финальный день легко разогнать до 'давайте еще туда'. Хороший гид в этот момент говорит: сначала вода, еда и проверка бюджета, потом героизм.",
        tip: "Если устали, лучше красивый короткий финал, чем длинный раздраженный.",
        detail:
          "Пауза нужна, чтобы не закончить поездку фразой 'мы больше никогда никуда'. Вода и еда - тоже часть маршрута.",
        routePoint: "55.6922,37.6725",
        image: imageUrls.dreamFood,
        imageAlt: "Dream Island внутри",
      },
    ],
    planBRoute: {
      label: "Маршрут на плохую погоду: Dream Island",
      description:
        "Если холодно или дождливо, выбираем Dream Island: променад, еда и отдельные развлечения вместо открытого парка.",
      routeUrl:
        "https://yandex.ru/maps/?rtext=55.6922,37.6725~55.6922,37.6725&rtt=mt",
      mapEmbedUrl: yandexEmbed(
        "https://yandex.ru/maps/?rtext=55.6922,37.6725~55.6922,37.6725&rtt=mt",
      ),
      commute: {
        meetingPoint: maryinoMeetingPoint,
        meetTime: "12:10",
        targetTime: "13:00",
        travelTime: "около 35-45 минут с запасом",
        routeText:
          "Марьино -> Технопарк, дальше пешком к Dream Island. Это редкий случай, когда плохая погода экономит дорогу.",
        routeUrl: yandexTransitFromMaryino("55.6922,37.6725"),
        outfitTags: ["худи или ветровка", "зонт по прогнозу", "удобная обувь"],
      },
      steps: [
        {
          id: "b19-dream-arrive",
          time: "13:00",
          title: "Dream Island: приезд",
          description: "Сразу в крытый формат, без проверки силы дождя на себе.",
          detail:
            "Главная идея - не покупать полный парк автоматически. Сначала осмотреться, понять силы и бюджет.",
          tags: ["в помещении", "дождь"],
          guideText:
            "Dream Island сочетает крытый променад и платные развлечения, поэтому подходит для гибкого финала.",
          tip: "Сначала бесплатная зона, потом решение по билетам.",
          routePoint: "55.6922,37.6725",
          image: imageUrls.dreamExterior,
          imageAlt: "Остров Мечты",
          mapUrl: "https://yandex.ru/maps/?text=Остров%20Мечты%20Москва",
        },
        {
          id: "b19-promenade",
          time: "13:30",
          title: "Городской променад",
          description: "Крытая прогулка, фото и ориентирование без полного билета.",
          detail:
            "Это хороший режим 'посмотреть и решить', а не 'платим, потому что приехали'. Бюджет тоже хочет жить.",
          tags: ["бесплатно", "фото"],
          guideText:
            "Променад позволяет провести часть дня внутри без обязательного входа в парк аттракционов.",
          tip: "Отделить бесплатную прогулку от платных зон в голове и кошельке.",
          routePoint: "55.6922,37.6725",
          image: imageUrls.dreamOfficial,
          imageAlt: "Dream Island внутри",
          mapUrl: "https://yandex.ru/maps/?text=Остров%20Мечты%20променад",
        },
        {
          id: "b19-game-food",
          time: "15:00",
          title: "Game center или еда",
          description: "Выбрать одну платную активность или просто нормально поесть.",
          detail:
            "Финальный день не обязан быть самым дорогим. Иногда лучший аттракцион - сесть, поесть и не спорить с погодой.",
          tags: ["по бюджету", "еда"],
          guideText:
            "Отдельные развлечения удобны тем, что не заставляют брать большой билет на весь парк.",
          tip: "Сначала лимит бюджета, потом развлечения. Не наоборот.",
          routePoint: "55.6922,37.6725",
          image: imageUrls.dreamRide,
          imageAlt: "Аттракционы Dream Island",
          mapUrl: "https://yandex.ru/maps/?text=Остров%20Мечты%20game%20center",
        },
      ],
      prices: [
        {
          title: "Dream Island: променад",
          price: "0 ₽",
          comment: "Крытая прогулка без полного билета.",
          level: "free",
        },
        {
          title: "Отдельные развлечения / еда",
          price: "по выбору",
          comment: "Зависит от решения на месте.",
          level: "mid",
        },
        {
          title: "Полный парк",
          price: "от 2 800 ₽",
          comment: "Только если бюджет правда готов.",
          level: "high",
        },
      ],
    },
    prices: [
      {
        title: "Парк Сказка",
        price: "от 1000 ₽",
        comment: "Не брать безлимит без необходимости.",
        level: "mid",
      },
      {
        title: "Dream Island: променад",
        price: "0 ₽",
        comment: "Крытая прогулка без билета в парк.",
        level: "free",
      },
      {
        title: "Dream Island: полный парк",
        price: "от 2 800 ₽",
        comment: "Уже недешево, еда отдельно.",
        level: "high",
      },
    ],
    sources: [
      { title: "Парк Сказка", url: "https://parkskazka.com/kontakty/" },
      { title: "Dream Island: билеты", url: "https://dreamisland.ru/tickets" },
      {
        title: "Dream Island: развлечения",
        url: "https://dreamisland.ru/entertainments",
      },
    ],
  },
];

export const quickAlternatives = [
  {
    title: "Хлебозавод + Флакон",
    price: "0-1 500 ₽",
    when: "Если хочется кофе, фото, шоурумы и стрит-арт на 2-3 часа.",
    text: "Креативные пространства у Дмитровской: бывшая промышленная территория, кафе, локальные бренды и городская архитектура без музейной тишины.",
    url: "https://hlebozavod9.ru/",
  },
  {
    title: "Московский зоопарк",
    price: "проверить тариф",
    when: "Если любят животных и погода не слишком мокрая.",
    text: "Не скучный музей, но большая прогулка. Ставить только если хватает сил после предыдущих дней.",
    url: "https://moscowzoo.ru/",
  },
  {
    title: "Квест 14+",
    price: "4 500-6 000 ₽ за игру",
    when: "Если хочется командный сюжет в помещении.",
    text: "Для двоих дороговато. Брать только нестрашный вариант и заранее проверить допуск без взрослых.",
    url: "https://afisha.yandex.ru/moscow/quests",
  },
];

export const safetyRules = [
  "Перед выходом отправить родителям маршрут дня и контрольное время возвращения.",
  "Не разделяться в метро, ТЦ, парках и очередях.",
  "У каждой: телефон, заряд, пауэрбанк, вода и деньги на обратную дорогу.",
  "Такси только через родителей или официальное приложение.",
  "Если что-то странно - идти к сотруднику метро, охране, кассиру или администратору.",
  "Активную часть заканчивать до 19:00-19:30, кроме Москва-Сити со взрослым.",
];

export const adultWarnings = [
  "Москва-Сити вечером - только со взрослым, не на пятницу и без дорогих ресторанов.",
  "Катамараны в Парке Горького самостоятельно только с 16 лет.",
  "Кикшеринг электросамокатов в Москве доступен с 18 лет.",
  "Высотные смотровые с правилом до 14 включительно со взрослым не ставить как самостоятельный пункт.",
];

export const weatherRows = [
  {
    date: "15 июня",
    forecast: "около 22°C, утром возможен небольшой дождь",
    take: "зонт, легкая куртка, кроссовки",
  },
  {
    date: "16 июня",
    forecast: "около 19°C, переменная облачность",
    take: "худи, вода, пауэрбанк",
  },
  {
    date: "17 июня",
    forecast: "около 19°C, возможен дождь после обеда",
    take: "дождевик, крытый маршрут при дожде",
  },
  {
    date: "18 июня",
    forecast: "около 18°C, возможны ливни",
    take: "спортивная форма, нескользящие носки",
  },
  {
    date: "19 июня",
    forecast: "около 16°C, прохладно",
    take: "худи или ветровка, крытый маршрут при дожде",
  },
];
