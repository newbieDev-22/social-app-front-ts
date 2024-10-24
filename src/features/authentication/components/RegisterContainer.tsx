import { useState } from "react";
import RegisterForm from "./RegisterForm";
import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import ModalModify from "../../../components/ModalModify";
// import Button from "../../../components/Button";
// import Modal from "../../../components/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function RegisterContainer() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="text-center">
        <Button
          fullWidth
          onClick={() => setOpen(true)}
          sx={{ backgroundColor: "rgb(34 197 94)", color: "white" }}
        >
          Create new account
        </Button>
      </div>

      <ModalModify open={open} onClose={handleClose} title="Register">
        <RegisterForm onSuccess={handleClose} />
      </ModalModify>
    </>
  );
}
