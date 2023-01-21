import { type Recipe } from "@prisma/client"
import { api } from "../../utils/api"
import Button from "../common/Button"
import Modal from "../common/Modal"
import Image from "next/image"
import { useToastControls } from "../../hooks/useToastControls"

interface Props {
    isOpen: boolean
    close: () => void
    recipeId: Recipe['id']
    image: string
    title: string
}

const RemoveRecipeModal: React.FC<Props> = ({
    isOpen,
    close,
    recipeId,
    image,
    title
}) => {

    const { show } = useToastControls()

    const utils = api.useContext()

    const removeRecipeMutation = api.recipe.delete.useMutation({
        onSuccess: () => {
            show('recipe-remove-success')
            close()
            void utils.recipe.getCurrentUserRecipes.invalidate()
        },
        onError: () => {
            show('recipe-remove-error')
        }
    })

    const handleRemoveRecipe = () => {
        removeRecipeMutation.mutate(recipeId)
    }

    return (
        <Modal
            isOpen={isOpen}
            close={close}
            title='Are you sure you want to delete the recipe?'
        >
            <div className='my-3'>
                <div className='prose'>
                    <h4>
                        {title}
                    </h4>
                    <div className=''>
                        <Image
                            src={image}
                            alt='image recipe'
                            priority
                            width={400}
                            height={200}
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className='flex flex-row space-x-3 justify-end w-full'>
                <Button
                    content={'Confirm'}
                    onClick={handleRemoveRecipe}
                    size='sm'
                    variant='error'
                    disabled={removeRecipeMutation.isLoading}
                    isLoading={removeRecipeMutation.isLoading}
                />
                <Button
                    content={'Cancel'}
                    onClick={close}
                    size='sm'
                    variant='ghost'
                />
            </div>
        </Modal>
    )
}

export default RemoveRecipeModal