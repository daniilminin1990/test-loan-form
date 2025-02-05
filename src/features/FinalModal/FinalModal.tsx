import s from './FinalModal.module.scss'
import {createPortal} from "react-dom";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../shared/lib/routes.ts";

type FinalModal = {
  onClose: () => void;
}

export const FinalModal = (props: FinalModal) => {
  const {onClose} = props
  const navigate = useNavigate();
  const storedPersonalInfo = localStorage.getItem("personalData");
  const {firstName, lastName, ...rest} = storedPersonalInfo ? JSON.parse(storedPersonalInfo) : {}
  const loanAmount = localStorage.getItem("loanAmount");
  const loanTerm = localStorage.getItem("loanTerm");

  const handleClick = () => {
    onClose();
    localStorage.removeItem("addressWorkData");
    localStorage.removeItem("personalData");
    localStorage.removeItem("loanTerm");
    localStorage.removeItem("loanAmount");
    navigate(ROUTES.MAIN);

  }
  return createPortal(
    <div className={s.modalOverlay} onClick={onClose}>
      <div className={s.modalContent} onClick={e => e.stopPropagation()}>
        <h4 className={s.textHead}>Поздравляем, {firstName} {lastName}!</h4>
        <p className={s.text}>Вам одобрена {loanAmount}$ на {loanTerm} дней.</p>
        <button className={s.btn} onClick={handleClick}>Закрыть</button>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};