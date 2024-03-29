'use client'

import styles from './SkillList.module.scss';

import AlternativeText from '../AlternativeText';

import { useEffect, useState } from 'react';
import CircleTempleteIcon from '../CircleTempleteIcon';
import SkillCard from '../SkillCard';

interface SkillType {
   name: string,
   srcIcon: string
}

const skillsMock: SkillType[] = [
   {
      name: "HTML",
      srcIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
   },
   {
      name: "CSS",
      srcIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
   },
   {
      name: "JavaScript",
      srcIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
   },
   {
      name: "NodeJS",
      srcIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
   },
   {
      name: "MySQL",
      srcIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
   }
]


export default function SkillList() {

   const [skills, setSkills] = useState<SkillType[]>([])

   useEffect(() => {
      async function fetchSkills() {
         try {
            const response = await fetch('http://localhost:8080/skills')
            const skills: SkillType[] = await response.json()
            setSkills(skills)
         } catch (error) {
            setSkills(skillsMock)
            return;
         }
      }
      fetchSkills();

   }, [])
   return (
      <ul className={styles.skillList}>
         {
            skills.length > 0 ?
               skills.map((skill) => {
                  const { name, srcIcon } = skill
                  return <SkillCard
                     key={name}
                     name={name}
                     srcIcon={srcIcon}
                  // proportion={1.2}
                  />
               }) :
               <AlternativeText imageSrc="/images/skills-build.png" />
         }
      </ul>
   )
}