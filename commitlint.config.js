module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'chore', // 改变构建流程、或者增加依赖库、工具等
                'docs', // 文档修改
                'feature', // 新特性
                'feat',
                'fix', // 修改问题
                'refactor', // 代码重构, 功能不变
                'style', // 代码格式修改
                'test', // 测试用例修改
            ],
        ],
        // 大小写不做检验
        'subject-case': [0],
    },
};
