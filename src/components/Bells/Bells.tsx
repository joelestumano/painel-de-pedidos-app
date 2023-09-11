import "./Bells.scss";
import { Icon } from "../Icon";

export const Bells: React.FC<{ ring: boolean }> = ({ ring, ...props }) => {
    return (
        <div className="bell-container">
            <Icon iconName="Bell" color="var(--bs-white)" size={56} className={`align-top ${ring ? "bell animate" : "bell"}`} />
        </div>
    );
}
