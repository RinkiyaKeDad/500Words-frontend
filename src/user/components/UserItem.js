import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    marginBottom: theme.spacing(1),
  },
  content: {
    flex: '1 0 auto',
    display: 'flex',
    width: theme.spacing(25),

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const UserItem = props => {
  const classes = useStyles();

  return (
    <li className='user-item' style={{ margin: '1rem' }}>
      <Link to={`/${props.id}/articles`} style={{ textDecoration: 'none' }}>
        <Card>
          <CardContent className={classes.content}>
            <Avatar
              alt='Remy Sharp'
              src={props.image}
              className={classes.large}
            />
            <Typography component='h5' variant='h5'>
              {props.name}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              {props.articleCount}{' '}
              {props.articleCount === 1 ? 'Article' : 'Articles'}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </li>
  );
};

export default UserItem;
