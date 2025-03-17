
import Layout from "@/components/layout"
import {TOKEN,DATABASE_ID} from "../config"
import Head from "next/head";
import ProjectItem from "@/components/home/projects/project-item"
export default function Projects({projects}){
console.log(projects)
  return(
    <>
        <Layout >
          <div className="flex flex-col items-center justify-center min-h-screen px-3 mb-10">
            <h1 className="text-4xl font-bold sm:text-4xl pb-8 mt-8 text-left">
              POPO :
              <span className="pl-4 text-blue-500">{projects.results.length}</span>
            </h1>

            {/* grid 레이아웃: 모바일은 1열, sm에서는 2열, 웹(대형 화면)에서는 5열 */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 w-full max-w-[1500px]">
              {projects.results.map((aProject) => (
                <div
                  key={aProject.id}
                  className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden"
                >
                  <ProjectItem data={aProject} />
                </div>
              ))}
            </div>
          </div>
        </Layout>
    </>
  )
}

//빌드 타임에 호출
export async function getStaticProps() {
  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Notion-Version': '2022-02-22',
      'content-type': 'application/json',
      'authorization': `Bearer secret_OYuiK72ZhH18axLtOeKMDIjsYExuq4gATOJbmMCWHOX`
    },
    body: JSON.stringify({page_size: 100})
  };
  
  const res = await fetch(`https://api.notion.com/v1/databases/4568e85d21064c068f38fdb8ac690e42/query`, options)

  const projects = await res.json()
  console.log("전체 projects 객체:", projects);

  const projectNames = projects.results.map((aProject)=>(
    aProject.properties.이름.title[0].plain_text
  ))
  console.log(`projectNames:${projectNames}`)
  return {
    props: {projects}, // will be passed to the page component as props
  }
}
