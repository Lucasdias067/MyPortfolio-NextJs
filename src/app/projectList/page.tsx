"use client"
import Link from "next/link"
import projectsLists from "../../assets/projetos.json"
import { useState } from "react"
import "./style.css"

type Projects = typeof projectsLists

export default function ProjectsList() {

  const [projects, setProjects] = useState(projectsLists);
  const [buttonName, setButtonName] = useState("");
  const [hasProjectFiltered, setHasProjectFiltered] = useState(false);

  const buttonFilters = [
    { name: "JavaScript" },
    { name: "React" },
    { name: "Next" },
    { name: "React Native" },
  ]

  function filterProjects(e: React.MouseEvent<HTMLButtonElement>) {
    const { name } = e.target as HTMLButtonElement
    const filteredProjects = projectsLists.filter(({ category }) => category === name);

    const ProjectIsNotFiltered = projects.length === projectsLists.length

    const hasDifferentCategory = projects.some(({ category }) => {
      const differentCategory = category !== name
      return differentCategory
    })

    filteringProjects(name, ProjectIsNotFiltered, hasDifferentCategory, filteredProjects)
  }

  function filteringProjects(name: string, ProjectIsNotFiltered: boolean, hasDifferentCategory: boolean, filteredProjects: Projects) {
    if (ProjectIsNotFiltered || hasDifferentCategory) {
      projectFiltered(name)
      return setProjects(filteredProjects)
    }
    setHasProjectFiltered(false)
    setProjects(projectsLists)
  }

  function projectFiltered(name: string) {
    setButtonName(name)
    setHasProjectFiltered(true)
  }

  function activeStyle(name: string) {
    const hasSameName = name === buttonName
    if (hasSameName && hasProjectFiltered) return "active";
    return ""
  }

  return (
    <section id="projectList" >
      <div className="centered">
        <h1 className="titles">
          Projetos
          <div className="effect"></div>
        </h1>
        <div className="containerFilter">
          {buttonFilters.map(({ name }) => (
            <button name={name} onClick={filterProjects} id={activeStyle(name)} key={name}>{name}</button>
          ))}
        </div>
      </div>
      <div className="sectionContainer">
        <div className="container">
          {projects.map(({ id, linkPage, title, description, linkGithub, image, hasImage }) => (
            <div className="projectCard" key={id} aria-haspopup="true">
              <Link href={linkPage} target="_blank">
                <div className="face face1" style={{
                  backgroundImage: `url('${image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                }}>
                  {!hasImage && <h3 className="titleH32">{title}</h3>}
                </div>
              </Link>
              <div className="face face2">
                <h3 className="titleH3">{title}</h3>
                <p>{description}</p>
                <div>
                  <span>{id}º</span> <Link href={linkGithub} target="_blank">Respositório</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section >
  )
}
