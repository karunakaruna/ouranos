import type { Editor } from "@tiptap/react";
import Button from "@/components/actions/button/Button";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Input from "@/components/inputs/input/Input";
import { BiLink, BiUnlink } from "react-icons/bi";
import { isValidUrl } from "@/lib/utils/link";

interface Props {
  editor: Editor;
}

export default function LinkPicker(props: Props) {
  const { editor } = props;
  const { selection } = editor.state;
  const [showLinkPicker, setShowLinkPicker] = useState(false);
  const [href, setHref] = useState("");
  const [showError, setShowError] = useState(false);

  const onClose = () => {
    setShowLinkPicker(false);
    setShowError(false);
    editor.commands.focus();
  };

  const onAddLink = (href: string) => {
    if (!isValidUrl(href)) {
      setShowError(true);
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: href })
      .focus()
      .run();

    onClose();
  };

  const onRemoveLink = () => {
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
    }
    onClose();
  };

  return (
    <Dialog.Root open={showLinkPicker} onOpenChange={setShowLinkPicker}>
      <Dialog.Trigger asChild>
        <Button
          disabled={!editor.isActive("link") && selection.empty}
          onClick={(e) => {
            e.stopPropagation();
            if (editor.isActive("link")) {
              onRemoveLink();
            } else {
              setShowLinkPicker(true);
              setShowError(false);
            }
          }}
          className="p-0"
        >
          {editor.isActive("link") ? (
            <BiUnlink className="text-2xl text-primary hover:text-primary-dark" />
          ) : (
            <BiLink className="text-2xl text-primary hover:text-primary-dark" />
          )}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-fade animate-duration-200 bg-skin-overlay-muted fixed inset-0 z-50" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-describedby="link-picker-description"
        >
          <section className="animate-fade-up animate-duration-200 bg-skin-base border-skin-base fixed bottom-0 z-50 flex h-fit w-full flex-col justify-between overflow-scroll rounded-t-3xl p-3 pb-16 shadow-2xl border-t no-scrollbar">
            <Dialog.Title className="text-skin-base mb-2 text-center text-xl font-semibold">
              Add a link
            </Dialog.Title>
            <div className="md:max-w-2xl w-full md:mx-auto">
              <div id="link-picker-description" className="sr-only">Enter the URL you want to link to</div>
              <Input
                type="url"
                placeholder="https://your-link.com"
                onChange={(e) => {
                  setHref(e.currentTarget.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onAddLink(e.currentTarget.value);
                  }
                }}
                onInput={() => setShowError(false)}
                aria-describedby="link-picker-description"
              />

              {showError && (
                <small className="text-status-danger block font-medium mt-2">
                  Invalid URL
                </small>
              )}
            </div>

            <div className="mt-2 gap-2 md:max-w-2xl w-full justify-end mr-auto flex items-center md:mx-auto">
              <Button
                onClick={onClose}
                className="hover:bg-skin-secondary border-skin-base text-skin-base rounded-full border px-4 py-2 text-sm font-semibold"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onAddLink(href);
                }}
                className="bg-primary hover:bg-primary-dark text-white rounded-full px-4 py-2 text-sm font-semibold"
              >
                Add link
              </Button>
            </div>
          </section>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
