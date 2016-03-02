A (not so simple) React application
===================================

This is a central repository that hosts various versions of the react project that correspond
to the following articles from http://spapas.github.io/:

- http://spapas.github.io/2015/06/05/comprehensive-react-flux-tutorial/
- http://spapas.github.io/2015/07/02/comprehensive-react-flux-tutorial-2/
- http://spapas.github.io/2015/09/08/more-complex-react-flux-example/
- http://spapas.github.io/2016/03/02/react-redux-tutorial/

To be able to follow the articles, I've added a bunch of tags in the repository (they go from
the simplest case to the most complex one):

- react-only
- react-only-validation
- react-flux
- react-flux-better-organization
- react-flux-complex
- react-redux

Get code for a tag
------------------

To get the code for a tag, just clone the repository and do a:

``git checkout TAG``

``python manage.py syncdb``

``npm install``

If you want to go to a different tag, you'll just do again a checkout to
the corresponding tag and do an ``npm install``, but you'll need to delete the ``db.sqlite3`` file (that
contains the database schema for the application) and then do a syncdb again because
there may be differences in the database between different tags.

Running the application
-----------------------

Now, to actually run the application, you'll need to use

``python manage.py runserver`` 

to start the django development server (or run rs.bat/rs.sh depending on
your shell). For the ``react-only`` version you
can directly modify the js files and see the differences when you
refresh the page in your browser. However, for all
other versions a node-js toolset with browserify is used to compile
the javascript sources to the bundle that is actually used.

So, when developing I recommend running ``npm run watch`` to start watchify
which automatically re-builds your javascript bundle when it detects a change. Another
solution is to run ``npm run build`` that will create a (minified) bundle with
the current sources (but will need to be re-run by hand when something in your
javascript changes).


You can find more info about how I use this node-js toolset
(browserify, watchify, uglify, babel etc) @ http://spapas.github.io/2015/05/27/using-browserify-watchify/
for a basic tutorial and @ http://spapas.github.io/2015/11/16/using-browserify-es6/ for
how to use ES6.


