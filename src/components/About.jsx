import { useState } from "react";
import { Trash2, Edit } from "lucide-react";
import { BookmarkPlus } from "lucide-react";
import { useEffect } from "react";

export default function About() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      nama: "solat subuh",
      completed: false,
    },
    {
      id: 2,
      nama: "piket asrama",
      completed: false,
    },
    {
      id: 3,
      nama: "piket kampus",
      completed: true,
    },
    // ... your other tasks
  ]);

  const [newProduct, setNewProduct] = useState({
    nama: "",
  });

  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [editTask, setEditTask] = useState(null);

 useEffect(() => {
   try {
     const storedTasks = JSON.parse(localStorage.getItem("tasks"));
     if (storedTasks) {
       setTasks(storedTasks);
     }
   } catch (error) {
     console.error("Error parsing tasks from localStorage:", error);
   }
 }, []);

  const handleDelete = (taskId) => {
    const isConfirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus tugas dengan ID ${taskId} ?`
    );

    if (isConfirmed) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  const handleAdd = () => {
    setShowAddProductForm(true);
  };

  const handleAddProduct = () => {
    if (newProduct.nama) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: prevTasks.length + 1, nama: newProduct.nama, completed: false },
      ]);
      resetNewProductForm();
    } else {
      alert("Harap isi semua field");
    }
  };

  const resetNewProductForm = () => {
    setNewProduct({ nama: "" });
    setShowAddProductForm(false);
    setEditTask(null); // Reset the edited task when closing the form
  };

  const handleToggleCompleted = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleEdit = (taskId) => {
    setEditTask(taskId);
    setShowAddProductForm(true);
    setNewProduct({
      nama: tasks.find((task) => task.id === taskId).nama,
    });
  };

  const handleEditProduct = () => {
    if (newProduct.nama) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTask ? { ...task, nama: newProduct.nama } : task
        )
      );
      resetNewProductForm();
    } else {
      alert("Harap isi semua field");
    }
  };

  const sortedTasks = tasks
    .sort((a, b) => {
      if (a.completed === b.completed) {
        return a.id - b.id;
      }
      return a.completed ? 1 : -1;
    })
    .filter((task) => {
      if (filter === "all") {
        return true;
      } else if (filter === "completed") {
        return task.completed;
      } else {
        return !task.completed;
      }
    });

  return (
    <div>
      <h2 className="title m-2 p-2">Tugas Harian</h2>
      <div className="button-container p-2 m-5">
        <button onClick={() => handleFilterChange("all")}>Semua</button>
        <button onClick={() => handleFilterChange("completed")}>Selesai</button>
        <button onClick={() => handleFilterChange("unfinished")}>
          Belum Selesai
        </button>
      </div>
      <ul>
        {sortedTasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <span className="checkbox-container">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleCompleted(task.id)}
              />
              {task.nama}
            </span>
            <button className="edit-button" onClick={() => handleEdit(task.id)}>
              <Edit /> Edit
            </button>
            <button
              className="delete-button"
              onClick={() => handleDelete(task.id)}
            >
              <Trash2 />
            </button>
          </li>
        ))}
      </ul>
      <button className="add-button" onClick={handleAdd}>
        <BookmarkPlus size={40} />
      </button>
      {showAddProductForm && (
        <div className="overlay">
          <div className="edit-form">
            <h1>{editTask ? "Edit" : "Tambah"} tugas </h1>
            <label>
              Nama
              <input
                type="text"
                value={newProduct.nama}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, nama: e.target.value })
                }
              />
            </label>
            <button onClick={editTask ? handleEditProduct : handleAddProduct}>
              Save
            </button>
            <button onClick={resetNewProductForm}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
}
