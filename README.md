# 🍲 Recipe Suggestion Feature: Prototype

### 📖 Table of Contents
- [Project Overview](#project-overview)
    - [Objectives](#-objectives)
    - [Tech Stack](#-tech-stack)
- [Getting Started](#getting-started)
    - [Pre-requisites](#-pre-requisites)
    - [Installation](#️-installation)
- [Usage](#-usage)
    - [Core features](#-core-features)
- [Credits](#credits)
- [License](#️-license)
- [Acknowledgements](#-acknowledgements)

## 🔍 Project Overview
As mentioned previously in the proposed Engineering Design Reviews, the new Recipe Suggestion Feature will recommend recipes to students based on the existing ingredients in their fridge. We do this by leveraging the data collected by the SSH cameras.

The purpose of this prototype is to showcase the effectiveness of the proposed design in reducing food waste and simplifying meal planning.

### 🎯 Objectives
This prototype aims to:
1. Provide a **user-friendly interface** for inputting ingredients and viewing recipe suggestions.

2. Demonstrate the effectiveness of **ingredient-based filtering** to match recipes.

3. Serve as a **foundation for future development**, including additional features and scalability.

To keep the project manageable within the scope of a prototype, the following features are ***excluded***:
1. **User Authentication:** No user accounts or login functionality.

2. **Custom Recipe Input:** Students cannot add or save their own recipes.

3. **Advanced Filters:** Filtering recipes by dietary preferences, meal type, or cooking time is not included.

4. **Integration with External APIs:** Recipe data is sourced from a local database or mock data instead of external APIs.

5. **Mobile or Responsive Design:** The prototype is optimized for desktop use only.

### 💻 Tech Stack

| **Frontend**            | **Backend**             | **Database**          | **Build Tool**       |
|--------------------------|-------------------------|------------------------|-----------------------|
| [![React][React.js]][React-url] | [![Spring Boot][Spring_boot]][Spring_boot-url] | [![MongoDB][MongoDB]][MongoDB-url] | [![Gradle][Gradle]][Gradle-url] |
| ![HTML]                 | [![Java][Java]][Java-url] | [![Postgres][Postgres]][Postgres-url] |                       |
| ![CSS]                  |                         |                        |                       |
| ![JavaScript]           |                         |                        |                       |


## 🛠️ Getting Started

### 📋 Pre-requisites

### ⬇️ Installation

## 📱 Usage

### 🌱 Core Features
**Ingredient-Based Recipe Suggestions**
- Based on existing data captured by the the SSH cameras, the system will provide recipe suggestions that match these ingredients.
- Alternatively, students can manually input a list of available ingredients or remove all filters to view all recipes.

**Recipe Matching**
- The system matches recipes based on the available ingredients, highlighting recipes with the most matches.
- Missing ingredients are identified for partially matched recipes.

**Recipe Details**
- Users can view detailed information about each recipe, including:
    - Required ingredients.
    - Step-by-step cooking instructions.

**Dynamic User Interface**
- A simple, intuitive interface for interacting with the system.
- Recipe results are displayed dynamically based on the user’s input

## ✨Credits

## ⚖️ License

## 🙌🏼 Acknowledgements


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[HTML]: https://img.shields.io/badge/html-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[CSS]: https://img.shields.io/badge/css-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[Javascript]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[Spring_boot]: https://img.shields.io/badge/Spring_boot-%236DB33F.svg?style=for-the-badge&logo=springboot&logoColor=white
[Spring_boot-url]: https://spring.io/projects/spring-boot
[Java]: https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white
[Java-url]: https://www.java.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Postgres]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://www.postgresql.org/
[Gradle]: https://img.shields.io/badge/Gradle-02303A.svg?style=for-the-badge&logo=Gradle&logoColor=white
[Gradle-url]: https://gradle.org/