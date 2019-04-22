import React, { Component } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "./../RecipeCard/RecipeCard";
import "./Home.css";
import store, { DELETE_RECIPE } from '../../store'

class Home extends Component {
  constructor(props) {
    const reduxState = store.getState()
    super(props);
    this.state = {
      recipes: reduxState.recipes
    };
  }
  componentDidMount() {
    store.subscribe(() => {
      const reduxState = store.getState()
      this.setState({
        recipes: reduxState.recipes
      })
    })
  }

  delete = (id) => {
    store.dispatch({
      type: DELETE_RECIPE,
      payload: id
    })
  }

  render() {
    const recipes = this.state.recipes.map((recipe, i) => {
      return (
        <RecipeCard
          key={i}
          name={recipe.name}
          category={recipe.category}
          authorFirst={recipe.authorFirst}
          authorLast={recipe.authorLast}
          ingredients={recipe.ingredients}
          instructions={recipe.instructions}
          id={recipe.id}
          deleteFn={this.delete}
        />
      );
    });
    return (
      <div className="Home">
        <Link to="/add/name">
          <button>Create New Recipe</button>
        </Link>
        <div className="card_container">{recipes}</div>
      </div>
    );
  }
}

export default Home;
