import { IModalProps } from "../data-type/react-type";
import { Box, Button, Modal, Typography } from "@mui/material";

export default function ModalModify({
  width = 600,
  title,
  children,
  open,
  onClose,
}: IModalProps) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width,
    bgcolor: "background.paper",

    boxShadow: 16,
    borderRadius: "8px",
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #dedede",
            mb: 2,
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "center", fontWeight: 700, my: 2 }}>
            {title}
          </Typography>
          <Button
            variant="text"
            onClick={onClose}
            sx={{ fontSize: "1.5rem", fontWeight: 700, color: "black" }}
          >
            &#10005;
          </Button>
        </Box>

        <Box>{children}</Box>
      </Box>
    </Modal>
  );
}
