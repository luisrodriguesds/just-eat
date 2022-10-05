import { ChangeEvent, FormEvent, HTMLAttributes } from "react";
import "./styles.css";

interface SearchProps extends HTMLAttributes<HTMLInputElement>{
  onSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
  onChangeForm: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Search({ onSubmitForm, onChangeForm, ...rest }: SearchProps){
  return (
    <div id="search">
      <form onSubmit={e => onSubmitForm(e)}>
        <input type="text" {...rest} name="search" onChange={e => onChangeForm(e)} />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}