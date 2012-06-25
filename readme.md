Railway Bootstrap Plugin
========================
[Railway Bootstrap](https://github.com/mhuggins/railway-bootstrap) is a
[RailwayJS](http://railwayjs.com/) plugin that will render forms for your models
utilizing [Twitter Bootstrap](http://twitter.github.com/bootstrap/) formatting
and CSS classes.

Requirements:
-------------
Railway Bootstrap requires [RailwayJS](https://github.com/1602/express-on-railway)
v2.6+.  The plugin may work with earlier version of RailwayJS, but is untested.

Additionally, RailwayJS uses [EJS](https://github.com/visionmedia/ejs) for
rendering view templates by default.  While RailwayJS is capable of working with
the [Jade](http://jade-lang.com/) rendering engine, Railway Bootstrap has not yet
been tested with Jade.

Installation:
-------------
Install the package via npm:

    > npm install railway-bootstrap

The Railway-Bootstrap plugin still needs to be initialized in your RailwayJS app.
In the root folder of your app, open (or create if it doesn't exist) `npmfile.js`,
and paste the following code:

    require('railway-bootstrap');

Usage:
------
Assume that your application has a `User` model with properties `username`,
`email`, `avatar`, and `description` in the following example.  Also assume that
`user` is an instance of the `User` model (generated via `new User()`).

    <% bootstrapFormFor(user, function (form) { %>
        <%- form.input('username') %>
        <%- form.input('email', { label: 'Email Address' }) %>
        <%- form.file('avatar') %>
        <%- form.textarea('description') %>
    <% }) %>

The `bootstrapFormFor` helper method can accept parameters in the following
formats:

1. `bootstrapFormFor(resource, callback)`
2. `bootstrapFormFor(resource, options, callback)`

In the second format, the `options` parameter represent a basic JS object.  Any
key/value pairs included in the object will be converted to HTML attributes on the
`<form>` DOM object.  For example:

    bootstrapFormFor(user, { action: '/users/new', method: 'put' }, function (form) { ... });

This will produce the following HTML:

    <form class="form-horizontal" action="/users/new" method="post">
        <input type="hidden" name="authenticity_token" value="f46d9de27e45fef8dce10a36dcdc7be7fa8612af" />
        <input type="hidden" name="_method" value="PUT" />
        <!-- any other calls made on the form object will render here -->
    </form>

For either format of `bootstrapFormFor` that is used, the `callback` parameter
will be provided with `form` object.  This object provides several methods used
for rendering form fields.  By default, each field is wrapped according to
Twitter Bootstrap's [horizontal form](http://twitter.github.com/bootstrap/base-css.html#forms)
format with an accompanying label

The following methods are provided:

* `input (name, options)`: Creates an `<input>` element, where `name` is the name of
  the resource's property to render.  If no `options` are provided, the input type
  defaults to "text".
* `textarea (name, options)`: Creates a `<textarea>` element, where `name` is the
  name of the resource's property to render.
* `file (name, options)`: Creates an `<input type="file">` element, where `name`
  is the name of the resource's property to render.
* `submit (label, options)`: Creates a `<button type="submit">` element, where
  `label` is the text to be rendered on the button.

Created By:
-----------
[Matt Huggins](http://www.matthuggins.com)

License:
--------
Railway-Bootstrap is released under the [MIT license](http://www.opensource.org/licenses/MIT).