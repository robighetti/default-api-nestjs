import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(  
  {    
    files: ['eslint.config.js'],   
    parser: '@eslint/js', 
    languageOptions: {      
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },    
    plugins: {},
    extends: [
        pluginJs.configs.recommended, 
        prettierConfig, 
    ],
    rules: {        
    }
  },  
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'], 
    ignores: ['build/', 'node_modules/', '.eslintrc.config.js'], 
    languageOptions: {
      parser: tseslint.parser, 
      parserOptions: {
        project: './tsconfig.json', 
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
    },
    extends: [
      pluginJs.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig,
    ],
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': 'error',
      '@typescript-eslint/no-empty-object-type': 'off'
    },
  },  
);