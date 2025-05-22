<div class="pointer-container" id="pointer">
    <div class="pointer anim <?php echo e(userCan('page-update', $page) ? 'is-page-editable' : ''); ?>" >
        <span class="icon mr-xxs"><?php echo icon('link'); ?> <?php echo icon('include', ['style' => 'display:none;']); ?></span>
        <div class="input-group inline block">
            <input readonly="readonly" type="text" id="pointer-url" placeholder="url">
            <button class="button outline icon" data-clipboard-target="#pointer-url" type="button" title="<?php echo e(trans('entities.pages_copy_link')); ?>"><?php echo icon('copy'); ?></button>
        </div>
        <?php if(userCan('page-update', $page)): ?>
            <a href="<?php echo e($page->getUrl('/edit')); ?>" id="pointer-edit" data-edit-href="<?php echo e($page->getUrl('/edit')); ?>"
               class="button primary outline icon heading-edit-icon ml-s px-s" title="<?php echo e(trans('entities.pages_edit_content_link')); ?>"><?php echo icon('edit'); ?></a>
        <?php endif; ?>
    </div>
</div><?php /**PATH /var/www/bookstack/resources/views/pages/parts/pointer.blade.php ENDPATH**/ ?>