import styles from "./AlertModal.module.scss";
import classNames from "classnames/bind";
import { KeyboardEventHandler, MouseEvent, MouseEventHandler } from "react";
import { Modal } from "@/src/sharing/ui-modal";
import { ModalContentBox } from "@/src/sharing/ui-modal-content-box";
import { ModalContentButton } from "@/src/sharing/ui-modal-content-button";
import { ModalContentDescription } from "@/src/sharing/ui-modal-content-description";
import { ModalContentTitle } from "@/src/sharing/ui-modal-content-title";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetcher from "../util/axiosInstance";
import { LinkRawData } from "@/src/link/type";
import { Folder, SelectedFolderId } from "@/src/folder/type";

const cx = classNames.bind(styles);

type AlertModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  buttonText: string;

  onCloseClick: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
  selectedFolderId?: SelectedFolderId;
};

export const AlertModal = ({
  isOpen,
  title,
  description,
  buttonText,

  onCloseClick,
  onKeyDown,
  selectedFolderId,
}: AlertModalProps) => {
  const queryClient = useQueryClient();

  const folderMutation = useMutation({
    mutationFn: () =>
      fetcher<Folder[]>({
        method: "delete",
        url: `/folders/${selectedFolderId}`,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["folders"] }),
  });

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    onCloseClick(e);
    folderMutation.mutate();
  };
  return (
    <Modal isOpen={isOpen} onBackdropClick={onCloseClick} onKeyDown={onKeyDown}>
      <ModalContentBox
        header={
          <div className={cx("modal-header")}>
            <ModalContentTitle>{title}</ModalContentTitle>
            <ModalContentDescription>{description}</ModalContentDescription>
          </div>
        }
        content={
          <ModalContentButton onClick={onClick} themeColor="red">
            {buttonText}
          </ModalContentButton>
        }
        onCloseClick={onCloseClick}
      />
    </Modal>
  );
};
