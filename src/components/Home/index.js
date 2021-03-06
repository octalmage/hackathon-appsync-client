import React from 'react';
import { Query } from 'react-apollo';
import {
  Container,
  Item,
  Loader,
} from 'semantic-ui-react';

import PostExcerpt from '../PostExcerpt';

import wordpressClient from '../../api/wordpress-client';
import QUERY_POSTS from '../../graphql/posts';

const Home = () => (
  <Query
    query={QUERY_POSTS}
    client={wordpressClient}
  >
    {({ loading, error, data }) => {
      if (loading) {
        return (
          <Loader>Loading</Loader>
        );
      }

      if (error) {
        console.error('Error!', error); // eslint-disable-line no-console
        return 'Error loading post';
      }

      const posts = data.posts.edges;

      console.log(posts); // eslint-disable-line no-console

      return (
        <Container text>
          {posts.length ?
            <Item.Group>
              {posts.map(({
                node: {
                  title,
                  slug,
                  excerpt,
                  modified,
                },
              }, index) => (
                <PostExcerpt
                  key={slug}
                  title={title}
                  excerpt={excerpt}
                  url={`posts/${slug}`}
                  date={modified}
                  imageURL={`https://loremflickr.com/640/480/dog?${Math.random()}`}
                  index={index}
                />
              ))
              }
            </Item.Group>
          : 'No posts found'
          }
        </Container>
      );
    }}
  </Query>
);

export default Home;
