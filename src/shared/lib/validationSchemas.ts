import { z } from "zod";

export const personalInfoSchema = z.object({
  phone: z
    .string()
    .min(10, "Введите полный номер")
    .regex(/^0\d{9}$/, "Формат: 0XXX XXX XXX"),
  firstName: z.string().min(1, "Имя обязательно"),
  lastName: z.string().min(1, "Фамилия обязательна"),
  gender: z.enum(["Мужской", "Женский"], {
    errorMap: () => ({ message: "Выберите пол" }),
  }),
});

export const addressWorkSchema = z.object({
  workPlace: z.string().min(1, "Выберите место работы"),
  address: z.string().min(5, "Введите корректный адрес"),
});

export const loanParamsSchema = z.object({
  amount: z.number().min(200, "Минимум $200").max(1000, "Максимум $1000"),
  term: z.number().min(10, "Минимум 10 дней").max(30, "Максимум 30 дней"),
});
