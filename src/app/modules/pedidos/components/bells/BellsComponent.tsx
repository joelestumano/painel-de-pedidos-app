import "./BellsComponent.scss";
import { BsIconComponent } from "../../../../shared/components/bs-icon/BsIconComponent";

export const BellsComponent: React.FC<{ ring: boolean }> = ({ ring, ...props }) => {
    return (
        <div className="bell-container">
            <BsIconComponent iconName="Bell" color="var(--bs-white)" size={48} className={`align-top ${ring ? "bell animate" : "bell"}`} />
        </div>
    );
}
