import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared/lib/routes.ts";
import "./PersonalInfo.module.scss";
import { personalInfoSchema } from "../../shared/lib/validationSchemas.ts";
import { z } from "zod";
import s from './PersonalInfo.module.scss'
import {useEffect } from "react";

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

export const PersonalInfo = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      phone: "",
      firstName: "",
      lastName: "",
      gender: "" as "Мужской" | "Женский",
    },
  });

  useEffect(() => {
    const storedPersonalInfo = localStorage.getItem("personalData");
    if (storedPersonalInfo) {
      reset(JSON.parse(storedPersonalInfo));
    }
  }, [reset]);

  const onSubmit = (data: PersonalInfoFormData) => {
    localStorage.setItem("personalData", JSON.stringify(data));
    navigate(ROUTES.ADDRESS_WORK);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <input type="tel" placeholder="Телефон" {...register("phone")} />
      {errors.phone && <p className={s.error}>{errors.phone.message}</p>}

      <input type="text" placeholder="Имя" {...register("firstName")} />
      {errors.firstName && <p className={s.error}>{errors.firstName.message}</p>}

      <input type="text" placeholder="Фамилия" {...register("lastName")} />
      {errors.lastName && <p className={s.error}>{errors.lastName.message}</p>}

      <select {...register("gender")}>
        <option value="">Выберите пол</option>
        <option value="Мужской">Мужской</option>
        <option value="Женский">Женский</option>
      </select>
      {errors.gender && <p className={s.error}>{errors.gender.message}</p>}

      <button type="submit">Далее</button>
    </form>
  );
};