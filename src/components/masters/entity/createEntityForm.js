import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import { Button } from '../../ui/button'
import { InputGroup, InputGroupText } from "../../ui/input-group";
import { Icon } from '@iconify/react';
import { Textarea } from "../../ui/textarea";

const CreateFormEntity = () => {
    return (
        <form>
            <div className="grid gap-4">
                <div className="col-span-2  flex flex-col gap-2">
                    <Label htmlFor="viFullName3">Company Name</Label>
                    <InputGroup merged>
                        <InputGroupText>
                            <Icon icon="mdi:user" />
                        </InputGroupText>
                        <Input type="text" placeholder="Company name" id="viFullName3" />
                    </InputGroup>
                </div>
                <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
                    <Label htmlFor="state">Type</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="GST">GST</SelectItem>
                            <SelectItem value="NON-GST">NON-GST</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="col-span-2 lg:col-span-1  flex flex-col gap-2">
                    <Label htmlFor="viCode3">GST Number</Label>
                    <InputGroup merged >
                        <InputGroupText>
                            <Icon icon="humbleicons:box" />
                        </InputGroupText>
                        <Input type="number" placeholder="GST Number" id="viCode3" />
                    </InputGroup>
                </div>
                <div className="col-span-2  flex flex-col gap-2">
                    <Label htmlFor="viEmail3">Company Address</Label>
                    <InputGroup merged>
                        <Textarea placeholder="Company Address" />
                    </InputGroup>
                </div>
                <div className="col-span-2  flex flex-col gap-2">
                    <Label htmlFor="viEmail3">Company Email Id</Label>
                    <InputGroup merged>
                        <InputGroupText>
                            <Icon icon="ic:outline-email" />
                        </InputGroupText>
                        <Input type="email" placeholder="Company email Id" id="viEmail3" />
                    </InputGroup>
                </div>
                <div className="col-span-2">
                    <Button type="submit">Submit Form</Button>
                </div>
            </div>
        </form>
    );
};

export default CreateFormEntity;