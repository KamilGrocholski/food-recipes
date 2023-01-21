import { useRouter } from "next/router"
import { type RecipePublicQueryOutput } from "../../server/api/routers/recipe"
import Button from "../common/Button"

const Tags: React.FC<{
    tags: RecipePublicQueryOutput['tags']
}> = ({
    tags
}) => {

        return (
            <section className='prose'>
                <h2>Tags</h2>
                <div className='flex flex-row flex-wrap gap-3'>
                    {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                        tags.map((tag, index) => (
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                            <Tag key={index} tag={tag.name ?? ''} />
                        ))}
                </div>
            </section>
        )
    }

export default Tags

const Tag: React.FC<{
    tag: string
}> = ({
    tag
}) => {
        const router = useRouter()

        const goToTag = () => {
            void router.push(`/recipes&${tag}`)
        }

        return (
            <Button
                size='sm'
                content={tag}
                onClick={goToTag}
                outline={true}
            />
        )
    }