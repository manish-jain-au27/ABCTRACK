import Card  from "../../ui/card-snippet"
import CreateFormEntity from "./createEntityForm";

const CreateEntity = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="space-10 w-full max-w-2xl p-6">
                <Card className="bg-white p-6" title={"CreateEntity"}>
                    <CreateFormEntity />
                </Card>
            </div>
        </div>
    );
};

export default CreateEntity;