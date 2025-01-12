import WebhookForm from "../forms/WebhookForm";
import GenericModal from "./GenericModal";

const CreateWebhook = ({ repository }) => {
  return (
    <GenericModal
      title={`Create a Webhook for ${repository.name}`}
      className="w-[700px]"
      containerClassName="flex overflow-y-auto"
    >
      <WebhookForm repository={repository} />
    </GenericModal>
  );
};

export default CreateWebhook;
