import { useState } from "react";

export default function AddMember() {
  const [form, setForm] = useState({
    username: "",
    name: "",
    phone: "",
    address: "",
  });

  const submit = async () => {
    await fetch("http://127.0.0.1:8000/api/members/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert("Member created!");
  };

  return (
    <div className="p-6">
      <input placeholder="Username" onChange={(e)=>setForm({...form,username:e.target.value})}/>
      <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
      <button onClick={submit}>Add</button>
    </div>
  );
}