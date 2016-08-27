import React, { PropTypes, Component } from 'react'

export default class Posts extends Component {
  render() {
    return (
      <ul>
        {this.props.posts.map((post, i) =>
          <li key={i}>
            <img src={post.picture} width={100} />
            <p>
              <span>{post.brand}</span> — <span>{post.name}</span> — (<span>{post.comparison_value}</span> <span>{post.comparison_unit}</span>)
            </p>
          </li>
        )}
      </ul>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}
