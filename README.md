<h1 align="center">
  Food Recipes
</h1>

### Table of content

- [Overview](#overview)
- [Things used to create it](#things-used-to-create-it)
- [Basic features](#basic-features)
- [How to run it locally](#how-to-run-it-locally)
- [Screenshots](#screenshots)

## Overview

Recipe creator with options for collecting and reviewing. Created with the [create-t3-app](https://create.t3.gg).

## Things used to create it

- [React Hook Form](https://react-hook-form.com)
- [Zod](https://react-hook-form.com) with [Zod Resolver](https://github.com/react-hook-form/resolvers#Zod) for validating the input on the client and the server side
- [Tailwind](https://tailwindcss.com) and [DaisyUI](https://daisyui.com) to style components
- [Prisma](https://www.prisma.io)
- [Cloudinary](https://cloudinary.com) to upload images

## Basic features

- Signing in with a google account
- Creating a recipe
- Creating a review for a recipe
- Creating a collection
- Adding recipes to collections

## How to run it locally

1. Clone the repository

```bash
git clone https://github.com/KamilGrocholski/food-recipes.git
```

2. Install dependencies

```bash
cd food-recipes
npm install
```

3. .env file

```
1. Rename the .env.example file to .env
2. Set the required env variables inside
```

4. Run the app

```bash
npm run dev
```

## Screenshots

- Home\
  ![screenshot](https://github.com/KamilGrocholski/voter/blob/main/images/home.png?raw=true)

- Recipes\
  ![screenshot](https://github.com/KamilGrocholski/voter/blob/main/images/home_recipes.png?raw=true)

- Recipe view\
  ![screenshot](https://github.com/KamilGrocholski/voter/blob/main/images/recipe_1.png?raw=true)
  ![screenshot](https://github.com/KamilGrocholski/voter/blob/main/images/recipe_2.png?raw=true)
  ![screenshot](https://github.com/KamilGrocholski/voter/blob/main/images/recipe_3.png?raw=true)

- Recipe creator\
  ![screenshot](https://github.com/KamilGrocholski/voter/blob/main/images/recipe_creator_1?raw=true)
  ![screenshot](https://github.com/KamilGrocholski/voter/blob/main/images/recipe_creator_2.png?raw=true)

- Search modal\
  ![screenshot](https://github.com/KamilGrocholski/voter/blob/main/images/search_modal.png?raw=true)

- Current user's recipes\
  ![screenshot](https://github.com/KamilGrocholski/voter/blob/main/images/my_recipes.png?raw=true)

- Profile\
  ![screenshot](https://github.com/KamilGrocholski/voter/blob/main/images/user_profile.png?raw=true)

- Collection of recipes\
  ![screenshot](https://github.com/KamilGrocholski/voter/blob/main/images/add?recipe?to?collections?modal.png?raw=true)
  ![screenshot](https://github.com/KamilGrocholski/voter/blob/main/images/collection_non_empty.png?raw=true)
