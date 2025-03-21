
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import api from '../services/api.js';
import Footer from '../components/layout/Footer.jsx';

import '../styles/mealPlan.css';
import { useNavigate } from 'react-router-dom';

const MealPlan = () => {
  const [recipes, setRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState({});
  const [expandedColumns, setExpandedColumns] = useState({});  // Este useState es para controlar las columnas expandidas
  const navigate = useNavigate();

  const daysOfWeek = ['Lunes ▼', 'Martes ▼', 'Miércoles ▼', 'Jueves ▼', 'Viernes ▼'];
  const meals = ['Desayuno', 'Comida', 'Cena'];

  const fetchSavedRecipes = async () => {
    try {
      const response = await api.get('/recipe/saved');
      setRecipes(response.data);
    } catch (err) {
      console.error('Error al cargar recetas:', err);
    }
  };

  const handleDrop = (day, meal, recipe, sourceKey) => {
    setMealPlan((prev) => {
      const updatedPlan = { ...prev };
      if (sourceKey) {
        delete updatedPlan[sourceKey];
      }
      updatedPlan[`${day}-${meal}`] = recipe;
      localStorage.setItem('mealPlan', JSON.stringify(updatedPlan));
      return updatedPlan;
    });
  };

  const handleRemove = (day, meal) => {
    setMealPlan((prev) => {
      const updatedPlan = { ...prev };
      delete updatedPlan[`${day}-${meal}`];
      localStorage.setItem('mealPlan', JSON.stringify(updatedPlan));
      return updatedPlan;
    });
  };

  const handleDragStart = (e, recipe, sourceKey) => {
    e.dataTransfer.setData('recipe', JSON.stringify(recipe));
    e.dataTransfer.setData('sourceKey', sourceKey);
  };

  const toggleColumn = (day) => {
    setExpandedColumns((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  useEffect(() => {
    fetchSavedRecipes();

    const savedMealPlan = JSON.parse(localStorage.getItem('mealPlan'));
    if (savedMealPlan) {
      setMealPlan(savedMealPlan);
    }
  }, []);


  console.log(recipes['0']);

  return (
    <div className="full-content">
      <Sidebar />
      <div className="meal-plan oswald-text content">
        <h1 className="text-center my-4">Plan Semanal de Comidas</h1>
        <table className="table">
          <thead>
            <tr>
              <th className="bg-opacity-0"></th>
              {daysOfWeek.map((day) => (
                <th
                  key={day}
                  className="text-center"
                  onClick={() => toggleColumn(day)}
                  style={{ cursor: 'pointer' }}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal}>
                <td className="day-cell text-center"><strong className="day-text">{meal}</strong></td>
                {daysOfWeek.map((day) => (
                  <td
                    key={`${day}-${meal}`}
                    className={`meal-cell ${expandedColumns[day] ? 'expanded' : ''}`}
                    onDrop={(e) => {
                      const recipe = JSON.parse(e.dataTransfer.getData('recipe'));
                      const sourceKey = e.dataTransfer.getData('sourceKey');
                      handleDrop(day, meal, recipe, sourceKey);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {expandedColumns[day] && mealPlan[`${day}-${meal}`] ? (
                      <div
                        className="d-flex flex-column justify-content-between align-items-center text-center"
                        draggable
                        onDragStart={(e) => handleDragStart(e, mealPlan[`${day}-${meal}`], `${day}-${meal}`)}
                      >
                        <div
                          className="recipe-card-meal-plan text-light"
                          style={{
                            backgroundImage: `url(${mealPlan[`${day}-${meal}`].foto_url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '200px',
                          }}
                        >
                          <div className="content-meal-table d-flex flex-column justify-content-between h-100 p-2">
                            <strong>{mealPlan[`${day}-${meal}`].titulo}</strong>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="my-auto">{mealPlan[`${day}-${meal}`].calorias} Calorías</p>
                              <i
                                className="trash-icon bi bi-trash-fill my-auto text-light bg-danger rounded h6 p-1 ms-2"
                                onClick={() => handleRemove(day, meal)}
                                title="Quitar receta del menú"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : expandedColumns[day] ? (
                      <p className="text-muted text-center h-100 m-0 d-flex justify-content-center align-items-center">
                        <i className="bi bi-plus-square-dotted"></i>
                      </p>
                    ) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {recipes.length > 0 ? (
          <h3 className="my-5 text-center">Recetas Guardadas</h3>
        ) : (
          <h4 className="text-danger my-5 text-center">No tienes recetas guardadas</h4>
        )}

        <div>
          <div className="d-flex flex-row justify-content-evenly align-items-center gap-3 flex-wrap">
            {recipes.map((recipe) => (

              <div key={recipe.id} className="recipe-card-meal-plan" style={{ backgroundImage: `url(${recipe.foto_url})`, width: '200px', height: '200px' }}>
                <div className="recipe-content-meal-plan h-100 d-flex flex-column justify-content-between"
                  onDragStart={(e) => handleDragStart(e, recipe)}
                  draggable="true">
                  <div className="recipe-content-meal-plan d-flex flex-column justify-content-between">
                    <h3 className="text-center w-100">{recipe.titulo}</h3>
                    <div className="d-flex">
                      <div className="m-0">
                        <p>{recipe.calorias} calorías</p>
                      </div>
                      <div className="d-flex justify-content-end align-items-center w-100">
                        <button
                          onClick={() => navigate(`/recipe/${recipe.id}`)}
                          className="button-peach"
                          title="Ver receta completa"
                        ><i className="bi bi-eye-fill"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            ))}
          </div>

        </div>
      </div>

    </div>
  );
};

export default MealPlan;

