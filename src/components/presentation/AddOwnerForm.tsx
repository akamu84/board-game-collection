import React, { FormEvent, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";

export interface AddOwnerFormProps {
  updateCollections: (owner: string) => Promise<void>;
}

const AddOwnerForm: React.FC<AddOwnerFormProps> = ({ updateCollections }) => {
  const [userName, setUserName] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateCollections(userName);
    setUserName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <InputLabel>Board Game Geek User</InputLabel>
        <Input
          required
          type="text"
          value={userName}
          onChange={e => setUserName(e.target.value.toLowerCase().trim())}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <Button type="submit">Add</Button>
    </form>
  );
};

export default AddOwnerForm;
