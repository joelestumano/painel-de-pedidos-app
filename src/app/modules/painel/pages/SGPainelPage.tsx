import { UseDocumentTitle } from "../../../shared/hooks/UseDocumentTitleHook";
import { OffCanvasComponent } from "../../../shared/components/off-canvas/OffCanvasComponent";

export const SGPainelPage: React.FC<{}> = () => {
    UseDocumentTitle("SG");
    return (
        <>
        <>teste sg painel</>
            <OffCanvasComponent />
        </>
    );
};
