import {ChangeEvent, useEffect, useState} from "react";
// import { useNavigate } from "react-router-dom";
import { FinalModal } from "../../features/FinalModal/FinalModal.tsx";
import s from "../AddressWork/AddressWork.module.scss";
import {ROUTES} from "../../shared/lib/routes.ts";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const LoanForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState(200)
  const [loanTerm, setLoanTerm] = useState(10)

  const handleSubmit = async () => {
    const personalData = JSON.parse(localStorage.getItem("personalData") || "");
    const { firstName, lastName } = personalData;

    setIsLoading(true);
    try {
      await axios.post("https://dummyjson.com/products/add", {
        title: `${firstName} ${lastName}`,
      });
      setIsModalOpen(true);
    } catch (error) {
      alert("Ошибка при отправке заявки!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackWard = () => {
    navigate(ROUTES.ADDRESS_WORK);
  }

  const handleCloseModal = () => setIsModalOpen(false)

  const handleChangeLoanAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setLoanAmount(+e.target.value);
  };

  const handleChangeLoanTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setLoanTerm(+e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("loanAmount", JSON.stringify(loanAmount));
  }, [loanAmount]);

  useEffect(() => {
    localStorage.setItem("loanTerm", JSON.stringify(loanTerm));
  }, [loanTerm]);

  return (
    <div className="form">
      <label>
        Сумма займа: {loanAmount} $
        <input type="range" min="100" max="1000" step="50" value={loanAmount}
               onChange={handleChangeLoanAmount}/>
      </label>

      <label>
        Срок займа: {loanTerm} дней
        <input type="range" min="5" max="30" step="1" value={loanTerm}
               onChange={handleChangeLoanTerm}/>
      </label>

      <div className={s.btnBlock}>
        <button onClick={handleBackWard} disabled={isLoading}>Назад</button>
        <button onClick={handleSubmit} disabled={isLoading}>{isLoading ? "Загрузка..." : "Подать заявку"}</button>
        {isModalOpen && <FinalModal onClose={handleCloseModal}/>}
      </div>
    </div>
  );
};