// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginImport from 'eslint-plugin-import';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'dist/**', 'node_modules/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      import: pluginImport,
    },
    rules: {
      // ==========================================
      // 1. TypeScript Rules (Quản lý chặt chẽ kiểu dữ liệu)
      // ==========================================
      '@typescript-eslint/no-explicit-any': 'warn', // Cảnh báo khi dùng kiểu 'any', khuyến khích khai báo kiểu rõ ràng
      '@typescript-eslint/no-floating-promises': 'error', // Bắt buộc handle Promise (dùng await hoặc .catch) để tránh nuốt lỗi ẩn
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', ignoreRestSiblings: true },
      ], // Không cho phép biến không sử dụng, ngoại trừ đối số bắt đầu bằng dấu gạch dưới (_)
      '@typescript-eslint/explicit-function-return-type': 'off', // Không bắt buộc khai báo kiểu trả về cho mọi hàm (TS tự suy rộng kiểu)
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Không bắt buộc khai báo kiểu ở ranh giới module
      '@typescript-eslint/no-unsafe-argument': 'warn', // Cảnh báo truyền đối số không an toàn (kiểu any)
      '@typescript-eslint/no-unsafe-assignment': 'warn', // Cảnh báo gán giá trị không an toàn (kiểu any)
      '@typescript-eslint/no-unsafe-member-access': 'warn', // Cảnh báo truy cập thuộc tính của đối tượng kiểu any
      '@typescript-eslint/no-unsafe-call': 'warn', // Cảnh báo gọi hàm từ đối tượng kiểu any

      // ==========================================
      // 2. JavaScript Best Practices (Các tiêu chuẩn thực thi tốt nhất)
      // ==========================================
      eqeqeq: ['error', 'always'], // Bắt buộc dùng === và !== để tránh lỗi tự động ép kiểu nguy hiểm
      curly: ['error', 'all'], // Bắt buộc dùng dấu ngoặc nhọn {} cho mọi block lệnh (if, for, while...)
      'prefer-const': 'error', // Khuyên dùng 'const' cho các biến không bao giờ bị gán lại
      'no-var': 'error', // Cấm sử dụng từ khóa 'var', bắt buộc dùng 'let' hoặc 'const'
      'no-console': ['warn', { allow: ['error', 'warn'] }], // Cảnh báo khi console.log dư thừa (chỉ cho phép error và warn)

      // ==========================================
      // 3. Import & Module Rules
      // ==========================================
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external', 'internal']],
          'newlines-between': 'always', // Bắt buộc cách dòng giữa các nhóm imports (để code gọn gàng)
        },
      ],
      // Vô hiệu hóa hai quy tắc import bên dưới vì TypeScript compiler đã kiểm tra cực kỳ chặt chẽ trong quá trình biên dịch (build)
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': 'off',

      // ==========================================
      // 4. Prettier Integration (Đảm bảo đồng nhất định dạng)
      // ==========================================
      'prettier/prettier': 'error', // Báo lỗi lint nếu code không đúng chuẩn format của Prettier
    },
  },
);
