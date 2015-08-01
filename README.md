# ocio
An html viz production environment.

## Some terms
Ocio provides a context where you can drop components. We'll call this this context **ocio environment** or simply **environment**.

Components may:
- enrich the environment by providing some data or functions (sources)
- do something with data in the environment, for example visualize it in some way.

Each component in the environment will be given a unique name that acts as a namespace for data or methods provided by the component itself.
Ocio has a non destructive approach to data, thus components acting as sources may never modify the original environment, but can only act on its namespace.

Each component provides an interface to connect with context which translates the "outer" world into something usable by the component itself.

## Interface

Each component comes with a configuration interface that may be interactively edited. The configuration "connects" the component with the environment

Each time a component is added or is modified its namspaced must be recalculated. If the namespace is used in some other  component configuration


## Data types

As components expects particular kind of data in their configurations, ocio introduces a concept of data types.

* integer
* string
* float
* array
* object
* function

###  Datasets
Datasets play a major role in our story and ocio must know about them.
For example data series should be annotated with data types of each column.

## components

### configuration interface
```

```

## Proof-of concept components

### CSV reader
Provides a data serie

### Bar chart
Plots a data serie
















