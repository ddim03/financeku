import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ApplicationLogo(props) {
    return (
        <div className="flex gap-2 items-center" {...props}>
            <FontAwesomeIcon icon={faCoins} size="lg" />
            <span className="font-medium text-lg text-gray-800">FinanceKu</span>
        </div>
    );
}
