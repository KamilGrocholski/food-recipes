const Description: React.FC<{ description: string }> = ({
    description
}) => {
    if (description === '') return null

    return (
        <section className='prose'>
            <h2>Descriptions</h2>
            <p>
                {description}
            </p>
        </section>
    )
}

export default Description