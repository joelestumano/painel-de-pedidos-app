import "./Bells.scss";
import { BsIcon } from "../../app/shared/components/BsIcon/BsIcon";

export const Bells: React.FC<{ ring: boolean }> = ({ ring, ...props }) => {
    return (
        <div className="bell-container">
            <BsIcon iconName="Bell" color="var(--bs-white)" size={48} className={`align-top ${ring ? "bell animate" : "bell"}`} />
        </div>
    );
}
