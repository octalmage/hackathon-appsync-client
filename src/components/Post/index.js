import React from 'react';
import { Query } from 'react-apollo';
import { Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import Inbox from '../Inbox';

import wordpressClient from '../../api/wordpress-client';
import QUERY_POST from '../../graphql/post';

const Post = ({ slug }) => (
  <Query
    query={QUERY_POST}
    variables={{ slug }}
    client={wordpressClient}
  >
    {({ loading, error, data }) => {
        if (loading) {
          return null;
        }

        if (error) {
          console.error('Error!', error); // eslint-disable-line no-console
          return 'Error loading post';
        }

        const postData = data.postBy;

        const {
          title,
          author,
          timestamp,
          content,
        } = postData;

        return (
          <Container text>
            <Header as="h1">
              {title}
            </Header>
            <div>
              <div>Author: {author}</div>
              <div>Posted at: {timestamp}</div>
              <div>Content:</div>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
            <div>
              <span>Reactions:</span>
            </div>
            <div>
              <span>Comments:</span>
              <Inbox />
            </div>
          </Container>
        );
      }}
  </Query>
);

Post.defaultProps = {
  slug: null,
};

Post.propTypes = {
  slug: PropTypes.string,
};

export default Post;
