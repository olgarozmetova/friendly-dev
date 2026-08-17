import type { Route } from './+types/index'
import type { Project } from '~/types'

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch('http://localhost:8000/projects')
  const data = await res.json()
  return { projects: data }
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] }

  return (
    <>
      <h2 className="text-3xl text-white text-bold mb-8">🚀 Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map(project => (
          <div
            key={project.id}
            className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-sm transition hover:shadow-md"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-3xl font-semibold text-blue-400 mb-1">
                {project.title}
              </h3>
              <p className="text-sm text-gray-300 mb-2">
                {project.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>{project.category}</span>
                <span>{new Date(project.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ProjectsPage
