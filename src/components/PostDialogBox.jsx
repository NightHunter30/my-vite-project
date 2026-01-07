import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { useState } from "react";
import RenderPost from "./RenderPost";


const PostDialogBox = ({ open, onOpenChange, postId }) => {

  console.log(postId)
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} size={{ mdDown: "full", md: "lg" }}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <RenderPost postId={postId} />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}


export default PostDialogBox;