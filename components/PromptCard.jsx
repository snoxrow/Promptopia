

const PromptCard = ({key, post, handleTagClick}) => {
  return (
    <div key={key}>
      <h1>Prompts</h1>
      <p>{post.prompt}</p>
      <p>{post.tag}</p>
    </div>
  )
}

export default PromptCard