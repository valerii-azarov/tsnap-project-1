import * as steps from "./index";

interface ComponentProps {
  component: React.ComponentType<any>;
  title: string;
  subtitle: string;
  buttons: {
    backButton: {
      hasButton: boolean;
      text: string;
    };
    nextButton: {
      hasButton: boolean;
    text: string;
    };
  };
}

const Steps: Record<number, ComponentProps> = {
  0: {
    component: steps.Step0,
    title: "Умови надання послуги",
    subtitle: "Ознайомтеся, будь ласка, з умовою",
    buttons: {
      backButton: {
        hasButton: false,
        text: "Назад",
      },
      nextButton: {
        hasButton: true,
        text: "Продовжити",
      },
    },
  },
  1: {
    component: steps.Step1,
    title: "Вибір міста",
    subtitle: "Виберіть, будь ласка, місто",
    buttons: {
      backButton: {
        hasButton: true,
        text: "Назад",
      },
      nextButton: {
        hasButton: true,
        text: "Продовжити",
      },
    },
  },
  2: {
    component: steps.Step2,
    title: "Вибір ЦНАП",
    subtitle: "Виберіть, будь ласка, адресу",
    buttons: {
      backButton: {
        hasButton: true,
        text: "Назад",
      },
      nextButton: {
        hasButton: true,
        text: "Продовжити",
      },
    },
  },
  3: {
    component: steps.Step3,
    title: "Категорія",
    subtitle: "Виберіть, будь ласка, категорію",
    buttons: {
      backButton: {
        hasButton: true,
        text: "Назад",
      },
      nextButton: {
        hasButton: true,
        text: "Продовжити",
      },
    },
  },
  4: {
    component: steps.Step4,
    title: "Послуга",
    subtitle: "Виберіть, будь ласка, послугу, яку бажаєте отримати",
    buttons: {
      backButton: {
        hasButton: true,
        text: "Назад",
      },
      nextButton: {
        hasButton: true,
        text: "Продовжити",
      },
    },
  },
  5: {
    component: steps.Step5,
    title: "Вид послуги",
    subtitle: "Виберіть, будь ласка, вид послуги",
    buttons: {
      backButton: {
        hasButton: true,
        text: "Назад",
      },
      nextButton: {
        hasButton: true,
        text: "Продовжити",
      },
    },
  },
  6: {
    component: steps.Step6,
    title: "Час візиту",
    subtitle: "Виберіть, будь ласка, вільні дату та час",
    buttons: {
      backButton: {
        hasButton: true,
        text: "Назад",
      },
      nextButton: {
        hasButton: true,
        text: "Продовжити",
      },
    },
  },
  7: {
    component: steps.Step7,
    title: "Персональні дані",
    subtitle: "Вкажіть, будь ласка, ваші персональні дані",
    buttons: {
      backButton: {
        hasButton: true,
        text: "Назад",
      },
      nextButton: {
        hasButton: true,
        text: "Продовжити",
      },
    },
  },
  8: {
    component: steps.Step8,
    title: "Перевірка",
    subtitle: "Перевіряйте, будь ласка, чи правильні дані",
    buttons: {
      backButton: {
        hasButton: true,
        text: "Назад",
      },
      nextButton: {
        hasButton: true,
        text: "Підтвердити",
      },
    },
  },
  9: {
    component: steps.Step9,
    title: "Підтвердження",
    subtitle: "Підтвердіть, будь ласка, щоб отримати електронний талон",
    buttons: {
      backButton: {
        hasButton: true,
        text: "Назад",
      },
      nextButton: {
        hasButton: true,
        text: "Отримати",
      },
    },
  },
  10: {
    component: steps.Step10,
    title: "Видача електронного талону",
    subtitle: "Ви отримаєте електронний талон і вчасно приходьте до ЦНАПу",
    buttons: {
      backButton: {
        hasButton: false,
        text: "Назад",
      },
      nextButton: {
        hasButton: true,
        text: "Завершити",
      },
    },
  },
};

export default Steps;