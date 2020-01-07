import React, { FormEvent, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      marginTop: '.5rem',
    },
    button: {
      marginTop: '.5rem',
    },
  }),
);

interface AddOwnerFormProps {
  addOwner: (owner: string) => Promise<void>;
}

const AddOwnerForm: React.FC<AddOwnerFormProps> = ({ addOwner }) => {
  const classes = useStyles();

  const [userName, setUserName] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addOwner(userName);
    setUserName('');
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <FormControl variant="filled" fullWidth>
        <InputLabel htmlFor="user-input">Board Game Geek User</InputLabel>
        <FilledInput
          id="user-input"
          type="text"
          onChange={(e) => setUserName(e.target.value.toLowerCase().trim())}
          endAdornment={
            <InputAdornment position="end">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        className={classes.button}
        type="submit"
        color="primary"
        variant="contained"
        fullWidth
      >
        Add
      </Button>
    </form>
  );
};

export default AddOwnerForm;
