<div template-manager>
    <?php if(userCan('templates-manage')): ?>
        <p class="text-muted small mb-none">
            <?php echo e(trans('entities.templates_explain_set_as_template')); ?>

        </p>
        <?php echo $__env->make('form.toggle-switch', [
               'name' => 'template',
               'value' => old('template', $page->template ? 'true' : 'false') === 'true',
               'label' => trans('entities.templates_set_as_template')
        ], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        <hr>
    <?php endif; ?>

    <?php if(count($templates) > 0): ?>
        <div class="search-box flexible mb-m">
            <input type="text" name="template-search" placeholder="<?php echo e(trans('common.search')); ?>">
            <button type="button"><?php echo icon('search'); ?></button>
            <button class="search-box-cancel text-neg hidden" type="button"><?php echo icon('close'); ?></button>
        </div>
    <?php endif; ?>

    <div template-manager-list>
        <?php echo $__env->make('pages.parts.template-manager-list', ['templates' => $templates], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    </div>
</div><?php /**PATH /var/www/bookstack/resources/views/pages/parts/template-manager.blade.php ENDPATH**/ ?>