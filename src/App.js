import { useState } from 'react';
import './App.css';

function App() {
  const [todolist, setTodolist] = useState([]); //todo list oluşturduk
  const [todo, setTodo] = useState(''); //listeye eklemek için öğeleri aldığımız yeri oluşturduk
  const [id, setId] = useState(1); //öğeler için id oluşturduk(silme vs)
  const [nullControl, setNullControl] = useState(false); // nullcontrol state olarak tanımlandı


  const add = (e) => {
    e.preventDefault(); //sayfa güncellemesi engelleme
    if (todo === '') {  //Boş değer kayıt etmemek için
      setNullControl(true);
    }
    else {
      setTodolist((todolist) => [{ text: todo, id: id }, ...todolist]); //input kayıt işlemi (text adı ile kayıt ettik)
      setTodo('') //input alanı temizleme
      setId(id + 1); //id ekleme
      setNullControl(false);

    }

  };
  window.onkeydown = function (e) {   //'ENTER' Tuşu için
    if (e.keyCode === 13) {
      add(e)
    }
  }

  const remove = (itemId) => {
    const updatedList = todolist.filter((item) => item.id !== itemId);  //Remove işlemi için
    setTodolist(updatedList);
  };

  return (
    <>
      <div  className="place">
        <h1>To Do list</h1>
        <input
          type="text"
          value={todo}  //yukarıda oluşturduğumuz todoya input'un value değerini bağlıyoruz
          onChange={(e) => setTodo(e.target.value)}  //EKLEME(target:input öğesi, value:input öğesinin value değeri)
                                                     //todo verisini inputtan girdiğimiz veri ile değiştiriyoruz
          placeholder="Yazınız..."
        />
        <button onClick={add}>
          EKLE
        </button>
        {nullControl && 
        <div id='warning'> <p>Lütfen bir şey yazın.</p></div>
        }

        {todolist.map((todos, index) => (
          <ul key={index}>
            {/* //IDYE GÖRE SİLME */}
           
            <li>{todos.text}</li><button id='remove' onClick={() => remove(todos.id)}>X</button>

          </ul>
        ))}
      </div>
    </>
  );
}

export default App;
