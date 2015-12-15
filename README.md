A (not so simple) React application

This is a central repository that hosts various versions of the react project that correspond
to the following articles from http://spapas.github.io/:

- http://spapas.github.io/2015/06/05/comprehensive-react-flux-tutorial/
- http://spapas.github.io/2015/07/02/comprehensive-react-flux-tutorial-2/
- http://spapas.github.io/2015/09/08/more-complex-react-flux-example/

To be able to follow the articles, I've added a bunch of tags in the repository(they go from
the simplest case to the most complex one):

- react-only
- react-only-validation
- react-flux
- react-flux-better-organization
- react-flux-complex

To get the code for a tag, just clone the repository and do a:

``git checkout TAG``
``python manage.py syncdb``

If you want to go to a different tag, you'll just do again a checkout to
the corresponding tag, but you'll need to delete the ``db.sqlite3`` file (that
contains the database schema for the application) and then do a syncdb again.
