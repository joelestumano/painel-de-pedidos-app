import { Button, Offcanvas } from "react-bootstrap";
import { BsIcon } from "../BsIcon/BsIcon";
import { useState } from "react";

export const OffCanvas: React.FC<{}> = ({ ...props }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    return (
        <>
            <Button
                type="button"
                title="offcanvas"
                variant="primary"
                style={{ zIndex: 100 }}
                onClick={toggleShow}
                className="position-fixed top-0 end-0 rounded-end-0 rounded-start-3 mt-5 px-2 shadow"
            >
                <BsIcon iconName="List" color="white" size={32} className="align-top" />
            </Button>
            <Offcanvas placement="end" show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <BsIcon iconName="Gear" size={32} className="align-middle me-1" />
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc. */}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}