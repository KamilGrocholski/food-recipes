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
                    {tags.map((tag, index) => (
                        <Tag key={index} tag={tag} />
                    ))}
                </div>
            </section>
        )
    }

export default Tags

const Tag: React.FC<{
    tag: RecipePublicQueryOutput['tags'][number]
}> = ({
    tag
}) => {
        const goToTag = () => {
            console.log(tag.name)
        }

        return (
            <Button
                content={tag.name}
                onClick={goToTag}
                variant='accent'
                outline={true}
            />
        )
    }