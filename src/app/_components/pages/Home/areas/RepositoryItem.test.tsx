import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import RepositoryItem from './RepositoryItem';

describe('RepositoryItem', () => {
  it('renders default item', () => {
    render(
      <MantineProvider>
            <RepositoryItem
              name="react"
              owner="facebook"
              description="A declarative, efficient, and flexible JavaScript library for building user interfaces."
              primaryLanguage="TypeScript"
              stargazerCount={210000}
              avatarUrl="https://avatars.githubusercontent.com/u/69631?v=4"
            />
          </MantineProvider>
    );

    expect(screen.getByText('react')).toBeInTheDocument();
    expect(
      screen.getByText(
        'A declarative, efficient, and flexible JavaScript library for building user interfaces.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('⭐ 210000')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /facebookのアバター/i })).toHaveAttribute(
      'src',
      'https://avatars.githubusercontent.com/u/69631?v=4'
    );
  });

  it('renders without language', () => {
    render(
      <MantineProvider>
        <RepositoryItem
          name="react"
          owner="facebook"
          description="A declarative, efficient, and flexible JavaScript library for building user interfaces."
          stargazerCount={210000}
          avatarUrl="https://avatars.githubusercontent.com/u/69631?v=4"
          primaryLanguage=''
        />
      </MantineProvider>
    );

    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
  });

  it('renders without avatar', () => {
    render(
      <MantineProvider>
        <RepositoryItem
          name="react"
          owner="facebook"
          description="A declarative, efficient, and flexible JavaScript library for building user interfaces."
          stargazerCount={210000}
          avatarUrl=''
          primaryLanguage='TypeScript'
        />
      </MantineProvider>
    );

    expect(screen.queryByRole('img', { name: /avatar/i })).not.toBeInTheDocument();
  });

  it('renders without owner', () => {
    render(
      <MantineProvider>
        <RepositoryItem
          name="react"
          owner="facebook"
          description="A declarative, efficient, and flexible JavaScript library for building user interfaces."
          stargazerCount={210000}
          avatarUrl="https://avatars.githubusercontent.com/u/69631?v=4"
          primaryLanguage='TypeScript'
        />
      </MantineProvider>
    );

    expect(screen.queryByText('facebook')).not.toBeInTheDocument();
  });

  it('renders without description', () => {
    render(
      <MantineProvider>
        <RepositoryItem
          name="react"
          owner="facebook"
          description=""
          stargazerCount={210000}
          avatarUrl="https://avatars.githubusercontent.com/u/69631?v=4"
          primaryLanguage=''
        />
      </MantineProvider>
    );

    expect(
      screen.queryByText(/A declarative, efficient, and flexible JavaScript library/)
    ).not.toBeInTheDocument();
  });
});
